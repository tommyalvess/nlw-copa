import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Heading, HStack, Text, VStack } from 'native-base';

import { Participants, ParticipantProps } from './Participants';

export interface PoolPros {
  id: string;
  code: string;
  titulo: string;
  ownerId: string;
  createdAt: string;
  owner: {
    nome: string;
  },
  participants: ParticipantProps[];
  _count: {
    participants: number;
  }
}

interface Props extends TouchableOpacityProps {
  data: PoolPros;
}

export function PoolCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        w="full"
        h={20}
        bgColor="gray.800"
        borderBottomWidth={3}
        borderBottomColor="yellow.500"
        justifyContent="space-between"
        alignItems="center"
        rounded="sm"
        mb={3}
        p={4}
      >
        <VStack>
          <Heading color="white" fontSize="md" fontFamily="heading">
            {data.titulo}
          </Heading>

          <Text color="gray.200" fontSize="xs">
            Criado por {data.owner.nome}
          </Text>
        </VStack>

        <Participants
          count={data._count.participants}
          participants={data.participants}
        />
      </HStack>
    </TouchableOpacity>
  );
}