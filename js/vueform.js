var app = new Vue({
    el: '#app',
    data: {
        current_page: 1,
        questions: [{
            question_name: "Store Type?",
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
            }, {
                val_name: "Centre",
                val_value: 4
            }],
            extent_questions: [{
                eval: 2,
                question_name: "Please provide details about the role",
                question_value: null,
                question_required: true,
                question_type: "textarea"
            }]}
        ]},
    methods: {
        checkPage() {
            alert("TO DO VALIDATION")
        }
    }
})