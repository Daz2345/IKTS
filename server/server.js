  Meteor.publish('fixturesList', function () {
      var self = this;
      try {

          var url = "http://football-api.com/api/?Action=fixtures",
              APIKeyValue = "5ddef2f3-8bc3-a95d-90973085aa59",
              CompID = "1204",
              fromDate = "07.02.2015", //Needs to be changed to dynamically set date for each week of the season
              toDate = "13.02.2015"; // = fromdate + 7

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
                  HomeTeam: item.match_localteam_name,
                  AwayTeam: item.match_visitorteam_name,
                  MatchDate: item.match_formatted_date,
                  MatchTime: item.match_time,
                  MatchStatus: item.match_status,
                  HomeScore: item.match_localteam_score,
                  AwayScore: item.match_visitorteam_score,
                  MatchID: item.match_id
              };

              self.added('fixtures', Random.id(), doc);
          });

          self.ready();

      } catch (error) {
          console.log(error);
      }
  });