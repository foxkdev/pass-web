import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import faviconService from "../../services/favicon.service";
import secretsService from "../../services/secrets.service";


export interface Secret{
    id: string;
    name: string;
    type: string;
    flags: any;
    content: any;
    icon: any;
    createdAt: Date;
    updatedAt: Date;
}

export const getSecretTypesThunk = createAsyncThunk(
    'secrets/getSecretTypes',
    async () => {
        let types = await secretsService.getTypes()
        return types
    }
)

export const getSecretsThunk = createAsyncThunk(
    'secrets/getSecrets',
    async () => {
        let secrets = await secretsService.getAllSecrets()
        const newSecrets = []
        for(const secret of secrets) {
            let icon: any = null
            if(secret.flags?.website) {
                try{
                    icon = await faviconService.getDomain(secret.flags.website)
                } catch {}
            }
            newSecrets.push({...secret, icon})
        }
        return newSecrets
    }
)

export const getSecretThunk = createAsyncThunk(
    'secrets/getSecret',
    async (id: string) => {
        let secret = await secretsService.getSecret(id)
        if(secret.flags?.website) {
            try{
                secret.icon = await faviconService.getDomain(secret.flags.website)
            } catch {}
        }
        return secret
    }
)

export const getSecretDecryptedThunk = createAsyncThunk(
    'secrets/getSecretDecrypted',
    async ({id, token}: {id: string, token: string}) => {
        let secret = await secretsService.getSecretDecrypted(id, token)
        if(secret) {
            if(secret.flags?.website) {
                try{
                    secret.icon = await faviconService.getDomain(secret.flags.website)
                } catch {}
            }
            return secret
        }
        throw Error('Token Password invalid')
        
    }
)

export const createSecretThunk = createAsyncThunk(
    'secrets/createSecret',
    async (data: {type: string, global: any, flags: any, content: any, token: string}) => {
        let secret = await secretsService.createSecret({
            type: data.type.toUpperCase(),
            global: data.global,
            flags: data.flags,
            content: data.content
        }, data.token)
        return secret
    }
)

export const updateSecretThunk = createAsyncThunk(
    'secrets/updateSecret',
    async (data: {id: string, global: any, flags: any, content: any, token: string}) => {
        let secret = await secretsService.updateSecret(data.id, {
            global: data.global,
            flags: data.flags,
            content: data.content
        }, data.token)
        return secret
    }
)
const getTokenRemembered = (): string | null => {
    const tokenEncrypted = localStorage.getItem('pass_token')
    return tokenEncrypted ? atob(tokenEncrypted) : null;
}
export const rememberTokenThunk = createAsyncThunk(
    'secrets/rememberToken',
    async (token: string) => {
        localStorage.setItem('pass_token', btoa(token))
        return true;
    }
)


interface secretsState {
    isLoading: boolean;
    secrets: Array<Secret>;
    currentItem: Secret | null;
    isDecrypted: boolean;
    errors: Array<any>;
    token: string | null;
    types: any;
}

const initialState: secretsState = {
    isLoading: false,
    secrets: [],
    currentItem: null,
    isDecrypted: false,
    errors: [],
    token: 'test',
    types: {},
}

export const secretsSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSecretTypesThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSecretTypesThunk.fulfilled, (state, action) => {
                state.types = action.payload
                state.isLoading = false
            })
            .addCase(getSecretTypesThunk.rejected, (state) => {
                state.isLoading = false
            })
        builder
            .addCase(getSecretsThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSecretsThunk.fulfilled, (state, action) => {
                state.secrets = action.payload
                state.isLoading = false
            })
            .addCase(getSecretsThunk.rejected, (state) => {
                state.isLoading = false
            })
        builder
            .addCase(getSecretThunk.pending, (state) => {
                state.isLoading = true
                state.currentItem = null
                state.isDecrypted = false
            })
            .addCase(getSecretThunk.fulfilled, (state, action) => {
                state.currentItem = action.payload
                state.isLoading = false
            })
            .addCase(getSecretThunk.rejected, (state) => {
                state.isLoading = false
                state.currentItem = null
            })
        builder
            .addCase(getSecretDecryptedThunk.pending, (state) => {
                state.isLoading = true
                state.isDecrypted = false
            })
            .addCase(getSecretDecryptedThunk.fulfilled, (state, action) => {
                state.currentItem = action.payload
                state.isLoading = false
                state.isDecrypted = true
            })
            .addCase(getSecretDecryptedThunk.rejected, (state, action) => {
                state.isLoading = false
                state.isDecrypted = false
                state.errors = [action.error.message]
            })
        builder
            .addCase(createSecretThunk.pending, (state) => {
                state.isLoading = true
                state.isDecrypted = false
            })
            .addCase(createSecretThunk.fulfilled, (state, action) => {
                state.currentItem = action.payload
                state.isLoading = false
                state.isDecrypted = true
            })
            .addCase(createSecretThunk.rejected, (state, action) => {
                state.isLoading = false
                state.isDecrypted = false
                state.errors = [action.error.message]
            })
        builder
            .addCase(updateSecretThunk.pending, (state) => {
                state.isLoading = true
                state.isDecrypted = false
            })
            .addCase(updateSecretThunk.fulfilled, (state, action) => {
                state.currentItem = action.payload
                state.isLoading = false
                state.isDecrypted = true
            })
            .addCase(updateSecretThunk.rejected, (state, action) => {
                state.isLoading = false
                state.isDecrypted = false
                state.errors = [action.error.message]
            })
    }
})
export const secretsActions = secretsSlice.actions
export default secretsSlice.reducer