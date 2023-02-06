import { Avatar, Button, Center, Heading, HStack, Text, useTheme, VStack } from 'native-base';
import { X, Check } from 'phosphor-react-native';
import { getName } from 'country-list';
import dayjs from "dayjs";
import ptbr from "dayjs/locale/pt-br";

import { Team } from './Team';
import { ParticipantProps } from './Participants';


export interface RankingCardProps {
  id: string;
  points: number;
  participant: ParticipantProps
};

interface Props {
  data: RankingCardProps;
  possition: number
};

export function RankingCard({data,possition}:Props) {
  const { colors, sizes } = useTheme();

  return (
    <HStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
      flex={1}
    >
         <Avatar
            source={{ uri: data.participant.user.avatarUrl}}
            w={12}
            h={12}
            rounded="full"
            borderWidth={2}
            marginRight={3}
            borderColor="gray.800"
          />
        <HStack flex={1} justifyContent="space-between">
            <VStack>
                <Heading color="white" fontSize="md" fontFamily="heading">
                  {data.participant.user.nome}
                </Heading>

                <Text color="gray.200" fontSize="xs" mr={1}>
                        {data.points} ponto(s)
                </Text>
            </VStack> 

          {possition + 1 >= 3 ? 
            <Center
              w="14"
              bgColor="gray.600"
              rounded="3xl"
              >
                <Text 
                  color="#8D8D99" 
                  fontSize="md">
                  {possition + 1}º
                </Text>
            </Center>
          :
            <Center
              w="14"
              bgColor="yellow.500"
              rounded="3xl"
            >
                <Text 
                  color="#000" 
                  fontSize="md">
                  {possition + 1}º
                </Text>
            </Center>
          }
           

        </HStack>
    </HStack>
  );
}