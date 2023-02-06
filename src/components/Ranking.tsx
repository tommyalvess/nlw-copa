import { Box, FlatList, useToast } from 'native-base';
import { useEffect, useState } from 'react';
import { api } from '../serveces/api';
import { EmptyMyPoolList } from './EmptyMyPoolList';
import { EmptyRakingList } from './EmptyRakingList';
import { Game, GameProps } from './Game';
import { Loading } from './Loading';
import { RankingCard, RankingCardProps } from './RankingCard';

interface Props {
  poolId: string;
}

export function Ranking({ poolId}: Props) {

  const [isLoading,setIsLoading] = useState(true)
  const [games,setGames] = useState<GameProps[]>([])
  const [firstTeamPoints,setFirstTeamPoints] = useState('')
  const [secondTeamPoints,setSecondTeamPoints] = useState('')
  const [poolRanking,setPoolRanking] = useState<RankingCardProps[]>([])

  const toast = useToast()

  async function fetchRanking() {
    try {
      setIsLoading(true)
      const response = await api.get(`/pools/${poolId}/ranking`)

      setPoolRanking(response.data);

    } catch (error) {
        console.log(error);
        toast.show({
            title: 'Não foi possível carregar os jogos!',
            placement: 'top',
            bgColor: 'red.500'
          })
    }finally {
        setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRanking()
  },[poolId])

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList
      data={poolRanking}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => (
        <RankingCard data={item} possition={index}/>
      )}
      _contentContainerStyle={{pb: 10}}
      ListEmptyComponent={ () => <EmptyRakingList />}
    />
        
  );
}
