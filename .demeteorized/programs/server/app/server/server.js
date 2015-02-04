(function(){  Meteor.publish('fixturesList', function () {
      var self = this;
      try {

          var url = "http://football-api.com/api/?Action=fixtures",
              APIKeyValue = "5ddef2f3-8bc3-a95d-90973085aa59",
              CompID = "1204",
              fromDate = moment().day(6).format("DD.MM.YYYY"), //Needs to be changed to dynamically set date for each week of the season
              toDate = moment().day(7).format("DD.MM.YYYY"); // = fromdate + 7

          var response = Meteor.http.get(url, {
              params: {
                  APIKey: APIKeyValue,
                  comp_id: CompID,
                  from_date: fromDate,
                  to_date: toDate
              }
          });

          var respJson = JSON.parse(response.content);

          _.each(respJson.matches, function (item) {
              var doc = {
                  MatchID: item.match_id,
                  MatchStatus: item.match_status,                  
                  MatchDate: item.match_formatted_date,
                  MatchTime: item.match_time,
                  HomeTeam: item.match_localteam_name,
                  HomeScore: item.match_localteam_score,
                  AwayTeam: item.match_visitorteam_name,
                  AwayScore: item.match_visitorteam_score
              };

              self.added('fixtures', Random.id(), doc);
          });

          self.ready();

      } catch (error) {
          console.log(error);
      }
  });

  Meteor.publish('standingsList', function () {
      var self = this;
      try {

          var url = "http://football-api.com/api/?Action=standings",
              APIKeyValue = "5ddef2f3-8bc3-a95d-90973085aa59",
              CompID = "1204"

          var response = Meteor.http.get(url, {
              params: {
                  APIKey: APIKeyValue,
                  comp_id: CompID,
              }
          });

          var respJson = JSON.parse(response.content);
          
          _.each(respJson.teams, function (item) {
              var doc = {
                  TeamName: item.stand_team_name,
                  GamesPlayed: item.stand_overall_gp,
                  Won: item.stand_overall_w,
                  Drawn: item.stand_overall_d,
                  Lost: item.stand_overall_l,
                  GoalsScored: item.stand_overall_gs,
                  GoalsAgainst: item.stand_overall_ga,
                  Position: item.stand_position,
                  Link: "https://www.google.co.uk/webhp?q=" & item.stand_team_name   
              };

              self.added('standings', Random.id(), doc);
          });

          self.ready();

      } catch (error) {
          console.log(error);
      }
  });

})();
