const v2 = 'https://api.bluechipsport.io/api/'

export const storageURL = `https://storage.bluechipsport.io`

const ENDPOINTS = {
  getCategories: { method: 'get', uri: `${v2}menu/front` },
  checkToken: { method: 'get', uri: `${v2}users/me` },
  updateUserInfo: { method: 'post', uri: `${v2}users/update` },
  signIn: { method: 'post', uri: `${v2}login/jwt` },
  getAppleToken: { method: 'get', uri: `${v2}sign-in/apple/token` },
  signInApple: { method: 'post', uri: `${v2}sign-in/apple` },
  signUp: { method: 'post', uri: `${v2}register` },
  resetPassword: { method: 'post', uri: `${v2}login/reset` },
  changePassword: { method: 'post', uri: `${v2}users/change-password` },
  getTeamsShort: { method: 'get', uri: `${v2}teams?short=1` },
  getSubscriptionsSearch: { method: 'get', uri: `${v2}search-mobile?short=1` },
  getLeagues: { method: 'get', uri: `${v2}leagues` },
  getTopLeagues: { method: 'get', uri: `${v2}leagues?is_cup=1&menu=1` },
  getLeaguesInfo: {
    method: 'get',
    uri: `${v2}leagues/info/{leagueID}?clear_cache=1`,
  },
  getTopTeams: { method: 'get', uri: `${v2}teams` },
  getLivescorePlayers: { method: 'get', uri: `${v2}players` },
  getLivescorePlayersShort: {
    method: 'get',
    uri: `${v2}players?short=1`,
  },
  getSlideArticles: {
    method: 'get',
    uri: `${v2}articles?options=paginate&category_id=2&page={page}`,
  },
  getMainArticles: {
    method: 'get',
    uri: `${v2}articles?options=paginate&category_id=1`,
  },
  getTransfersArticles: {
    method: 'get',
    uri: `${v2}articles?options=paginate&category_id=3`,
  },

  getTransferSeasons: {
    method: 'get',
    uri: `${v2}transfer-seasons`,
  },
  getSeasonTransfers: {
    method: 'get',
    uri: `${v2}transfers?season_id={id}`,
  },
  getLeagueTeamTransfers: {
    method: 'get',
    uri: `${v2}transfers?league_id={league_id}&team_id={team_id}`,
  },
  getLeagueTransfers: {
    method: 'get',
    uri: `${v2}transfers?league_id={league_id}`,
  },
  getTransferLeagues: {
    method: 'get',
    uri: `${v2}transfers/leagues`,
  },
  getLeagueTeams: {
    method: 'get',
    uri: `${v2}teams?league_id={id}&short=1`,
  },
  getLatestArticles: {
    method: 'get',
    uri: `${v2}articles?options=paginate&category_id=1`,
  },
  getVideoArticles: {
    method: 'get',
    uri: `${v2}articles?options=paginate&category_id=82`,
  },
  getArticle: { method: 'get', uri: `${v2}articles/{id}` },
  getPolls: { method: 'get', uri: `${v2}polls` },
  answerPoll: { method: 'post', uri: `${v2}polls/answer` },
  getQuizzes: { method: 'get', uri: `${v2}quizzes` },
  startQuiz: { method: 'get', uri: `${v2}quizzes/{id}/start` },
  answerQuiz: { method: 'post', uri: `${v2}quizzes/{quizId}/{sessionId}` },
  getPlayersInfo: {
    method: 'get',
    uri: `${v2}livescoreplayer/info/{playerID}`,
  },
  getMatchesList: { method: 'get', uri: `${v2}matches}` },
  getLiveMatches: {
    method: 'get',
    uri: `${v2}leagues?haveTodayMatches=1&menu=1`,
  },
  getClubInfo: { method: 'get', uri: `${v2}teams/info/{teamID}` },
  getClub: { method: 'get', uri: `${v2}teams/info/{teamID}` },
  getClubNews: { method: 'get', uri: `${v2}teams/articles/{teamID}` },
  getLiveMatchesDetail: {
    method: 'get',
    uri: `${v2}matches?byleague=1&league={id}`,
  },
  getSearch: { method: 'get', uri: `${v2}search` },
  MySubscriptions: { method: 'get', uri: `${v2}my-subscriptions` },
  subscriptionsSearch: {
    method: 'get',
    uri: `${v2}my-subscriptions?search={search}`,
  },
  getMySubscriptions: { method: 'get', uri: `${v2}my-subscriptions` },
  subscribeTeam: { method: 'get', uri: `${v2}subscribe/team/{teamID}` },
  subscribePostTeam: { method: 'post', uri: `${v2}subscribe/team/{teamID}` },
  getTeamNews: { method: 'get', uri: `${v2}teams/articles/{teamID}` },
  getLeaguesNews: { method: 'get', uri: `${v2}leagues/articles/{teamID}` },
  subscribePlayer: { method: 'post', uri: `${v2}subscribe/player/{PlayerId}` },
  getDeviceId: { method: 'get', uri: `${v2}favorites/dev-id` },
  getLeaguesList: { method: 'get', uri: `${v2}leagues?is_cup=0` },
  matchsDetails: {
    method: 'get',
    uri: `${v2}teams/matches/{id}?per_page=1000&page={page}&order={order}`,
  },
  getMatchsDetails: {
    method: 'get',
    uri: `${v2}teams/players/{id}?per_page=1000&page=1`,
  },
  getTeamOverview: {
    method: 'get',
    uri: `${v2}teams/data/{id}`,
  },
  getTeamPlayers: {
    method: 'get',
    uri: `${v2}teams/stats/{id}`,
  },
  getTeamsStatistic: {
    method: 'get',
    uri: `${v2}teams/league-stats/{id}/{LeagueId}`,
  },
  getTeamsStanding: {
    method: 'get',
    uri: `${v2}teams/standings/{id}`,
  },
  getClubNameLogo: {
    method: 'get',
    uri: `${v2}{itemType}/{id}`,
  },
  getTeamsTransfers: {
    method: 'get',
    uri: `${v2}teams/transfers/{id}?per_page=10&page=1`,
  },
  getLivescoreplayer: {
    method: 'get',
    uri: `${v2}livescoreplayer/info/{PlayerId}`,
  },
  getLivescorePlayerAtricles: {
    method: 'get',
    uri: `${v2}livescoreplayer/articles/{id}`,
  },
  standingSearch: {
    method: 'get',
    uri: `${v2}standings-mobile?search={search}`,
  },
  addOrRemoveFavoriteMatches: {
    method: 'get',
    uri: `${v2}favorites/{action}?device_id={deviceId}&match_id={id}`,
  },
  getLiveMatchesMeetings: {
    method: 'get',
    uri: `${v2}live-matches/h2h/{match_id}?per_page=10`,
  },
  getLineUp: { method: 'get', uri: `${v2}live-matches/players/{id}` },
  getLiveMatchesMobile: {
    method: 'get',
    uri: `${v2}live-matches/overview-mobile/{match_id}`,
  },

  liveMatchStatistic: {
    method: 'get',
    uri: `${v2}live-matches/statistics/{match_id}`,
  },

  liveMatchPlayer: {
    method: 'get',
    uri: `${v2}live-matches/players/{match_id}`,
  },

  // *match comments*  ->
  getMatchDiscussion: { method: 'get', uri: `${v2}match/{matchID}/comments` },
  addMatchComments: { method: 'post', uri: `${v2}match/{matchID}/comments` },
  getDiscussionReply: {
    method: 'get',
    uri: `${v2}match/{matchID}/comments/{commentID}/replies`,
  },
  deleteMatchComment: {
    method: 'delete',
    uri: `${v2}match/{matchID}/comments/{commentID}`,
  },
  addMatchCommentLike: {
    method: 'post',
    uri: `${v2}matchcomments/like/{commentID}`,
  },
  addMatchCommentDisLike: {
    method: 'post',
    uri: `${v2}matchcomments/dislike/{commentID}`,
  },
  editMatchComment: {
    method: 'put',
    uri: `${v2}match/{matchID}/comments/{commentID}`,
  },
  addMatchReply: {
    method: 'post',
    uri: `${v2}match/{matchID}/comments/{commentID}/replies`,
  },
  addMatchReplyLike: {
    method: 'post',
    uri: `${v2}matchreplies/like/{commentID}`,
  },
  addMatchReplyDisike: {
    method: 'post',
    uri: `${v2}matchreplies/dislike/{commentID}`,
  },
  editMatchReplyComment: {
    method: 'put',
    uri: `${v2}match/{matchID}/comments/{commentID}/replies/{replCommentID}`,
  },
  deleteMatchReplyComment: {
    method: 'delete',
    uri: `${v2}match/{matchID}/comments/{commentID}/replies/{replCommentID}`,
  },
  getRound: {
    method: 'get',
    uri: `${v2}leagues/matches_round/{id}?stage={stageId}&season={seasonId}&round={roundId}`,
  },
  leaguesStandings: {
    method: 'get',
    uri: `${v2}standings/{id}`,
  },
  leaguesStandingsAverage: {
    method: 'get',
    uri: `${v2}seasons/{seasonID}/stats`,
  },
  leaguesTeamStandings: {
    method: 'get',
    uri: `${v2}standings/{leagueID}`,
  },

  getFavoriteMatches: {
    method: 'get',
    uri: `${v2}favorites?device_id={deviceId}`,
  },

  getLivematches: {
    method: 'get',
    uri: `${v2}live-matches?byleague=1&league=0&per_page=15&page=1`,
  },
  getMatchesData: {
    method: 'get',
    uri: `${v2}matches?byleague=1&league=0&date={id}&per_page=20&page=1&device_id={deviceId}`,
  },
  ligaStats: {
    method: 'get',
    uri: `${v2}leagues/stats/{leagueId}`,
  },

  likeArticle: {
    method: 'post',
    uri: `${v2}articles/{id}/like`,
  },
  unlikeArticle: {
    method: 'post',
    uri: `${v2}articles/{id}/unlike`,
  },

  // -<---------------------
  // *news comments* ->
  getNewsComments: { method: 'get', uri: `${v2}articles/{articleId}/comments` },
  addNewsComment: { method: 'post', uri: `${v2}articles/{articleId}/comments` },
  getNewsCommentsReply: {
    method: 'get',
    uri: `${v2}articles/{articleId}/comments/{commentID}/replies`,
  },
  deleteNewsComment: {
    method: 'delete',
    uri: `${v2}articles/{articleId}/comments/{commentID}`,
  },
  addNewsCommentLike: { method: 'post', uri: `${v2}comments/like/{commentID}` },
  addNewsCommentDisLike: {
    method: 'post',
    uri: `${v2}comments/dislike/{commentID}`,
  },
  editNewsComment: {
    method: 'put',
    uri: `${v2}articles/{articleId}/comments/{commentID}`,
  },
  addNewsReply: {
    method: 'post',
    uri: `${v2}articles/{articleId}/comments/{commentID}/replies`,
  },
  addNewsReplyLike: {
    method: 'post',
    uri: `${v2}replies/like/{replCommentID}`,
  },
  addNewsReplyDisike: {
    method: 'post',
    uri: `${v2}replies/dislike/{replCommentID}`,
  },
  editNewsReplyComment: {
    method: 'put',
    uri: `${v2}articles/{articleId}/comments/{commentID}/replies/{replCommentID}`,
  },
  deleteNewsReplyComment: {
    method: 'delete',
    uri: `${v2}articles/{articleId}/comments/{commentID}/replies/{replCommentID}`,
  },

  // ---------------------<-
  getUserComments: { method: 'get', uri: `${v2}my-comments` },
  registerNotificationToken: {
    method: 'get',
    uri: `${v2}notifications/{deviceId}?token={token}`,
  },

  // append the list of endpoints to use with API module
  // name it whatever you want, but consider 'method' and 'uri' are mandatory
  // 'kwds' object in API call is used to replace matching keys found in the endpoint 'uri'
  // for exmaple: "getArticle: { method: 'get', uri: 'articles/{id}' }"
  // '{id}' will be replaced with matching keywords passed from an API call
  // ex: API.getArticle({kwds: {id: 15628}})
  // and resulting uri will become from 'articles/{id}' >>> 'articles/15628'

  // complete list of endpoints
  // get - users/export
  // get - users/activate
  // get - users/me
  // get - users/stats
  // get - users/statistics
  // get - users/{id}/articles
  // get - users/{id}/subscriptions
  // get - users/{id}/comments
  // patch - users/update
  // post - register
  // post - subscribe/category/{id}
  // post - subscribe/tag/{id}
  // post - subscribe/team/{id}
  // patch - categories/reorder
  // get - categories/export
  // get - tags/export
  // patch - home-categories/reorder
  // post - login/jwt
  // post - login/refresh_token
  // post - gallery/upload
  // post - gallery/upload/sm-video
  // post - gallery/{id}
  // post - polls/answer
  // patch - slides/reorder
  // post - tv-programs/{id}
  // patch - top-teams/reorder
  // get - comments
  // get - comments/stats
  // get - comments/latest
  // get - comments/item/{itemid}
  // post - comments/item/{itemid}
  // get - comments/delete/{itemid}
  // post - comments/delete
  // get - matchcomments
  // get - matchcomments/stats
  // get - matchcomments/latest
  // get - matchcomments/item/{itemid}
  // post - matchcomments/item/{itemid}
  // get - matchcomments/delete/{itemid}
  // post - matchcomments/delete
  // post - matchreplies/like/{repl_id}
  // post - matchreplies/dislike/{repl_id}
  // post - matchcomments/like/{com_id}
  // post - matchcomments/dislike/{com_id}
  // post - replies/like/{repl_id}
  // post - replies/dislike/{repl_id}
  // post - comments/like/{com_id}
  // post - comments/dislike/{com_id}
  // patch - standings/reorder
  // patch - standings/{id}/reorder
  // any - matches
  // any - match/{id}
  // post - matchrate/{id}
  // any - leagues
  // any - leagues-mobile
  // any - leagues/{id}
  // any - leagues/matches/{id}
  // any - leagues/matches_round/{id}
  // any - leagues/stats/{id}
  // any - teams
  // any - teamsbyleague/{league_id}
  // any - teamsbyleague
  // any - teams/{id}
  // any - teams/matches/{id}
  // any - teams/search/{s}
  // any - countries
  // any - livescoreplayers
  // any - livescoreplayer/{id}
  // any - livescoreplayersforplayers
  // any - livescoreplayers/search/{s}
  // any - standings
  // any - standings/{league}/{saeson}
  // any - rounds/{season}
  // get - sidebar
  // post - sidebar/update
  // get - livescorestatus
  // post - livescorestatus/update
  // get - ads
  // get - ads/item/{id}
  // post - ads/item/
  // post - ads/item/{id}
  // get - ads/positions
  // get - clubs
  // any - clubs/search/{s}
  // get - clubs/item/{id}
  // post - clubs/item/
  // post - clubs/item/{id}
  // post - clubs/delete/{id}
  // get - players
  // any - players/search/{s}
  // get - players/item/{id}
  // post - players/item/
  // post - players/item/{id}
  // post - players/delete/{id}
  // get - leaguesrel
  // get - search/{s}
  // get - search
  // get - articles/search
  // get - articles/todayviews
  // get - articles/userstats
  // get - articles/top
  // get - articles/subscribed
  // get - articles/{id}/similar
  // get - articles
  // get - new_videos
  // get - new_videos/item/{id}
  // post - new_videos/item/
  // post - new_videos/item/{id}
  // post - new_videos/delete/{id}
  // post - new_videos/upload
  // get - new_polls
  // get - new_polls/item/{id}
  // post - new_polls/item
  // post - new_polls/item/{id}
  // post - new_polls/delete/{id}
  // post - new_polls/answer
}

export default ENDPOINTS
