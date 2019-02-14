var app = new Vue({
    el: '#app',
    data: {
        current_page: 1,
        questions: [{

            question_name: "Store Type",
            question_value: null,
            question_required: true,
            question_page: 1,
            question_type: "radio",
            vals: [{
                    val_name: "Mall",
                    val_value: 1
                },{
                    val_name: "Metro",
                    val_value: 2
                },{
                    val_name: "Arcade",
                    val_value: 3
                },{
                    val_name: "Centre",
                    val_value: 4
            }],
            extent_questions: [{
                eval: 2,
                question_name: "Provide Details",
                question_value: null,
                question_required: true,
                question_type: "textarea"
            }]}, {

            question_name: "Type in the users name",
            question_value: null,
            question_required: true,
            question_page: 1,
            question_type: "autofill",
            extent_questions: [{
                eval: 0,
                question_name: "First Name",
                question_value: null,
                question_required: true,
                question_type: "text"
            },{
                eval: 0,
                question_name: "Last Name",
                question_value: null,
                question_required: true,
                question_type: "text"
            }]
            },{

            question_name: "What is the Users role?",
            question_value: null,
            question_required: false,
            question_page: 2,
            question_type: "dropdown",
            vals: [{
                val_name: "Dev",
                val_value: 1
            }, {
                val_name: "Manager",
                val_value: 2
            }, {
                val_name: "Student",
                val_value: 3
            }]}, {

            question_name: "When did the first user join?",
            question_value: null,
            question_required: true,
            question_page: 2,
            question_type: "date",
            },{

            question_name: "Is this person located in Victoria?",
            question_value: null,
            question_required: true,
            question_page: 2,
            question_type: "radio",
            vals: [{
                val_name: "Yes",
                val_value: 1
            }, {
                val_name: "No",
                val_value: 2
            }],
            extent_questions: [{
                eval: 1,
                question_name: "Where in Victoria?",
                question_value: null,
                question_required: true,
                question_type: "text"
            }]
        }],

        autofill_names: {
            people: []
        }
    
    
    
    },
    methods: {
        getNames() {
            var data_temp = []
            var result = $.get("https://randomuser.me/api/?results=50&nat=au&exc=login", function(data){
                for (i = 0; i < data.results.length; i++) {
                    //console.log(data.results[i].name)
                    data_temp.push(data.results[i].name)
                }
            })
            this.autofill_names.people.push(data_temp)
        },

        buildData() {
            // Packaging for JSON post
            data_to_send = {}
            for (i = 0; i < this.questions.length; i++) {
                //Building question and answer pairs
                data_to_send["q"+i] = this.questions[i].question_value
                if (this.questions[i].extent_questions) {
                    data_to_send["hq"+i] = this.questions[i].extent_questions[0].question_value
                }
            }
            console.log(data_to_send)
            sendData(data_to_send)
        },

        backPage() {
            if (this.current_page > 1) {
                current_page -= 1
            }
        },

        checkPage() {
            // Validation
            this.getNames()
            var missed_questions = []
            for (i = 0; i < this.questions.length; i++) {
                if (this.questions[i].question_page == this.current_page && this.questions[i].question_required == true) {
                    if (this.questions[i].question_value == null) {
                        // To change for better UI(?)
                        missed_questions.push(this.questions[i].question_name)
                        console.log(missed_questions)
                    }
                }
            }

            // Collect all empty fields
            if (missed_questions.length != 0) {
                var err_message = "Please answer the following questions;\n"
                for (i = 0; i < missed_questions.length; i++) {
                    err_message += missed_questions[i]+"\n"
                }
                alert(err_message)
                return 0
            }
            
            // Page Selection
            if (this.current_page == 1) {
                this.current_page += 1           // displays page 2 content only
            } else {
                this.buildData()
            }
        },

    
    }
})