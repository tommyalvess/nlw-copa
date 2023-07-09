import { NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";
import { useAuth } from "../hooks/useAuth";
import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";

export function Routes() {

    const {user} =  useAuth()
    
    return (
        // o box é para evitar bugs na transicao de telas. Usar com o mesmo plano de fundo default das telas
        <Box flex={1} bg="gray.900">
            <NavigationContainer>
                {user.name ? <AppRoutes /> : <SignIn />}
            </NavigationContainer>
        </Box>
    )
}
