import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {Header} from '../header';
import Scores from './shared/Scores';
import {useQuery} from 'react-query';
import {getMatchInfo, getMatchOverview} from '../../../api/match';
import Scrollable from './shared/Scrollable';
import Live from './shared/scrollable/Live';
import Players from './shared/scrollable/Players';
import Empty from './shared/scrollable/Empty';
import TopPlayers from './shared/scrollable/TopPlayers';
import Statistics from './shared/scrollable/Statistics';

type Props = {
  navigation: any;
  route: {
    params: {
      matchId: number;
    };
  };
};

const MatchDetails = ({navigation, route}: Props) => {
  const {matchId} = route.params;

  const {data: info, isLoading} = useQuery(['MATCH_INFO', matchId], () =>
    getMatchInfo(matchId),
  );

  const {data: overview, isLoading: isLoadingOverview} = useQuery(
    ['MATCH_OVERVIEW', matchId],
    () => getMatchOverview(matchId),
  );

  const headerLeftAction = useMemo(
    () => ({
      onPress: navigation.goBack,
      iconName: 'ArrowRight',
    }),
    [navigation.goBack],
  );

  const scrollableData = [
    {
      id: 1,
      label: 'Match',
      returnFunc: () => (
        <Live
          visitorTeamId={info?.data?.visitorTeam?.data?.id}
          localTeamId={info?.data?.localTeam?.data?.id}
          data={overview}
        />
      ),
    },
    {
      id: 2,
      label: 'Line Ups',
      returnFunc: () => (
        <Players
          matchId={matchId}
          localTeamId={info?.data?.localTeam?.data?.id}
        />
      ),
    },
    {
      id: 3,
      label: 'Top Players',
      returnFunc: () => <TopPlayers matchId={matchId} />,
    },
    {id: 4, label: 'Stats', returnFunc: () => <Statistics matchId={matchId} />},
    {id: 5, label: 'Compare', returnFunc: () => <Empty />},
    {id: 6, label: 'Comments', returnFunc: () => <Empty />},
    {id: 7, label: 'Standings', returnFunc: () => <Empty />},
    {id: 8, label: 'H2H', returnFunc: () => <Empty />},
  ];
  if (isLoading || isLoadingOverview) {
    return null;
  }
  return (
    <View style={styles.flex}>
      <Header title={'MATCH DETAILS'} leftAction={headerLeftAction} />
      <Scores
        visitorTeam={info?.data?.visitorTeam}
        scores={info?.data?.scores}
        localTeam={info?.data?.localTeam}
      />
      <Scrollable data={scrollableData} />
    </View>
  );
};

export default MatchDetails;

const styles = StyleSheet.create({
  flex: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F2F2',
  },
});
