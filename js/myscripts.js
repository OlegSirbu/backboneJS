(function() {
     window.App = {
        Models: {},
        Views: {},
        Collections: {}
     };

}());


//Модель человека
App.Models.Person = Backbone.Model.extend({
    defaults: {
        name: 'Иван Петров',
        age: 40,
        job: 'слесарь'
    }
});
 
var person = new App.Models.Person();
 
//Список людей
App.Collections.People = Backbone.Collection.extend({
    model: App.Models.Person
});
 
 
//Вид одного человека
 App.Views.Person = Backbone.View.extend({
    tagName: 'li',
    template: _.template('<strong><%= name %></strong> ( <%= age %> ) - <%= job %>'),
    initialize: function() {
    },
    render: function() {
        //замечательный шаблон
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }, 
    events: {
        "click" : "showalert"
    },
    showalert: function() {
        
    },


});

//Вид списка людей
App.Views.People = Backbone.View.extend({
    tagName: 'ul',
    initialize: function() {
    },
 
    render: function() {
        this.collection.each(function(person) {
            var personView = new  App.Views.Person({model: person});
            this.$el.append(personView.render().el);
        }, this);
        return this;
    }
 
});

var peopleCollection = new App.Collections.People([
    {
        name: 'Петр',
        age: 20,
        job: 'Таксист'
    },
    {
        name: 'Олег',
        age: 24,
        job: 'Менеджер'
    },
    {
        name: 'Анна',
        age: 18,
        job: 'Студентка'
    }
]);

var peopleView = new App.Views.People({collection: peopleCollection});

jQuery(document).ready(function() {
    $("#block").append(peopleView.render().$el);
});