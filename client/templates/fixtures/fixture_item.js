    Fixture = new Mongo.Collection('fixtures');

    Session.set('searching', false);

    Tracker.autorun(function () {
        var searchHandle = Meteor.subscribe('fixturesList');
        Session.set('searching', !searchHandle.ready());
    });


    Template.fixtureItem.helpers({
        fullTime: function (status) {
            return this.MatchStatus === status;
        }
    });