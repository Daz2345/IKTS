Template.standingsList.helpers({
    standings: function () {
        return Standing.find()
    }
});