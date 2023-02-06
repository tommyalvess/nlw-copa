import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Share } from "react-native";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolPros } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { Ranking } from "../components/Ranking";
import { RankingCardProps } from "../components/RankingCard";
import { api } from "../serveces/api";


interface RouteParams {
    id: string
}

export function Details() {
    const [isLoading,setIsLoading] = useState(true)
    const [poolDetails,setPoolsDetails] = useState<PoolPros>({} as PoolPros)
    const [optionSelected,setOptionSelected] = useState<'guesses'|'ranking'>('guesses')

    const route =  useRoute()
    const toast = useToast()

    const {id} = route.params as RouteParams

    async function fetchPoolDetails() {
        try {
            setIsLoading(true)

            const response = await api.get(`/pools/${id}`)
            setPoolsDetails(response.data);
            
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'Não foi possível carregar os detalhes do bolão!',
                placement: 'top',
                bgColor: 'red.500'
              })
        }finally {
            setIsLoading(false)
        }
    }

    async function handleCodeShare() {
        await Share.share({
            message: poolDetails.code
        })
    }

    useEffect(() => {
        fetchPoolDetails()
    },[id])

    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title={poolDetails.titulo} showBackButton showShareButton onShare={handleCodeShare}/>

            {
                poolDetails._count?.participants > 0 ? 
                    <VStack px={5} flex={1}>
                        <PoolHeader  data={poolDetails}/>
                        <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                            <Option title="Seus palpites" isSelected={optionSelected === 'guesses'} onPress={() => setOptionSelected('guesses')} />
                            <Option title="Ranking do grupo" isSelected={optionSelected === 'ranking'} onPress={() => setOptionSelected('ranking')}/>
                        </HStack>

                        {
                            optionSelected === 'guesses' ?
                            <Guesses poolId={poolDetails.id} code={poolDetails.code}/>
                            :
                            <Ranking poolId={poolDetails.id} />

                        }
                        

                    </VStack>
                :
                    <EmptyMyPoolList code={poolDetails.code}/>
            }

        </VStack>
    )
}