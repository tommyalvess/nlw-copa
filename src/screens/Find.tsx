import { Heading, useToast, VStack } from 'native-base';
import React, { useState } from 'react';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../serveces/api';
import { useNavigation } from '@react-navigation/native';

export function Find(){
    const [isLoading,setIsLoading] = useState(false)
    const [code,setCode] = useState('')

    const toast = useToast()
    const {navigate} = useNavigation()

    async function handleJoinPool() {
        try {
            setIsLoading(true)

            if (!code.trim()) {
            return toast.show({
                        title: 'Informe o código!',
                        placement: 'top',
                        bgColor: 'red.500'
                    })
            }

            console.log(code.trim());
            
            await api.post('/pools/join', { code: code.trim() })

            toast.show({
                title: "Você entrou no bolão com sucesso!",
                placement: 'top',
                bgColor: 'red.500'
            })

            setCode('')
            setIsLoading(false)
            navigate('pools')

        } catch (error) {
            setIsLoading(false)

            const msg:string = error.response?.data?.message

            if (msg) {
                console.log('tem coisa aqui');
                return toast.show({
                    title: `${msg}`,
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            toast.show({
                title: 'Opsss! Algo deu errado!',
                placement: 'top',
                bgColor: 'red.500'
            })
          
        }
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title='Buscar por código' showBackButton/>

            {/* Ela deixa os elementos um emabixo do outro */}
            <VStack mt={8} mx={5} alignItems="center">

                <Heading 
                    fontFamily="heading"
                    color="white"
                    fontSize="xl"
                    mb={8}
                    textAlign="center"
                >
                    Encontre um bolão através de {'\n'}
                    seu código único
                </Heading>

                <Input 
                    mb={2}
                    placeholder="Qual o código do bolão?"
                    value={code}
                    onChangeText={setCode}
                />

                <Button 
                    title='BUSCAR BOLÃO'
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                />

            </VStack>
        </VStack>
    );
}