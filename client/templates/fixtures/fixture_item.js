    Fixture = new Mongo.Collection('fixtures');

    Session.set('searching', false);

    Tracker.autorun(function () {
        var searchHandle = Meteor.subscribe('fixturesList');
        var searchHandle2 = Meteor.subscribe('standingsList');
        Session.set('searching', !searchHandle.ready());
        Session.set('searching2', !searchHandle2.ready());
    });


    Template.fixtureItem.helpers({
        fullTime: function (status) {
            return this.MatchStatus === status;
        }
    });