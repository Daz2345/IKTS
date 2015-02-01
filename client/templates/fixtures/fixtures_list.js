Template.fixturesList.helpers({
    fixtures: function () {
        return Fixture.find()
    }
});

Template.home.helpers({
    searching: function () {
        return Session.get('searching');
    }
});