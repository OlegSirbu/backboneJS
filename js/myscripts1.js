$(function() {  
    // пространство имён
    window.App = {
        Models: {},
        Collections: {},
        Views:{},
        Router:{}
    };
 
    // шаблон
    window.template = function(id) {
        return _.template( $('#' + id).html() );
    };
    
    App.Router = Backbone.Router.extend({
        routes : {
            "" : "start"
        },
        start: function(){
        }
    });

    new App.Router;
    
    Backbone.history.start();

    App.Models.Task = Backbone.Model.extend({});
 
    App.Views.Task = Backbone.View.extend({
        initialize: function () {
            this.model.on("change", this.render, this);
            this.model.on("destroy", this.remove, this);
        },
        tagName: 'li',
        className:'Row',
        template: template('taskTemplate'),
        render: function () {
            var template = this.template(this.model.toJSON());
            this.$el.html( template );
            return this;
        },
        events:{
            'click .edit': 'editTask',
            'click .delete': 'destroy'
        },
        remove: function () {
            this.$el.remove();
        },
        destroy: function () {
            this.model.destroy();
        },
        editTask: function  () {
            var newTaskTitle = prompt('Как переименуем задачу?', this.model.get('title'));
            this.model.set('title', newTaskTitle);
        }
    });
 
    App.Collections.Task = Backbone.Collection.extend({
        model: App.Models.Task
    });

    App.Views.AddTask = Backbone.View.extend({
        el: "#addTask",

        events: {
            "submit": "submitFun"
        },

        initialize: function () {
        },

        submitFun: function(e){
            e.preventDefault();
            var newTaskTitle = $(e.currentTarget).find("input[type=text]").val();
            var newTask = new App.Models.Task({title: newTaskTitle});
            this.collection.add(newTask);
        }

    });
 
    App.Views.Tasks = Backbone.View.extend({
        tagName: 'ul',

        initialize: function () {
            this.collection.on('add', this.addOne, this);
        },
        
        render: function() {
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function(task) {
            // создавать новый дочерний вид
            var taskView = new App.Views.Task({ model: task });
            // добавлять его в корневой элемент
            this.$el.append(taskView.render().el);
        }
    });
 
    window.tasksCollection = new App.Collections.Task([
        {
            title: 'Сходить в магазин',
            priority: 4
        },
        {
            title: 'Получить почту',
            priority: 3 
        },
        {
            title: 'Сходить на работу',
            priority: 5 
        },
    ]);
 
    var tasksView = new App.Views.Tasks({ collection: tasksCollection});
    var addTaskView = new App.Views.AddTask({ collection: tasksCollection});
    $('.tasks').html(tasksView.render().el);
});