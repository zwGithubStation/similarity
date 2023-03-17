'use client'

import { FC, useState } from 'react'
import  Button from './ui/Button';
import { Loader2, Key } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/DropdownMenu'
import { ApiKey } from '@prisma/client';
import { toast } from './ui/Toast';
import { useRouter } from 'next/navigation'
import { createApiKey } from '@/helpers/create-api-key';
import { revokeApiKey } from '@/helpers/revoke-api-key';

interface ApiKeyOptionsProps {
    apiKeyId: string
    apiKeyKey: string
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({apiKeyId, apiKeyKey}) => {

    const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false)
    const [isRevoking, setIsRevoking] = useState<boolean>(false)
    const router = useRouter()

    const createNewApiKey = async () => {
        setIsCreatingNew(true)

        try {
            await revokeApiKey({ keyId: apiKeyId })
            await createApiKey()
            router.refresh()
        }catch (error) {
            toast({
                title: 'Error creating API key',
                message: 'Please try again later',
                type: 'error',
            })
        } finally {
            setIsCreatingNew(false)
        }
    }

    const revokeCurrnetApiKey = async () => {
        setIsRevoking(true)


        try {
            await revokeApiKey({ keyId: apiKeyId })
            router.refresh()
        }catch (error) {
            toast({
                title: 'Error revoking API key',
                message: 'Please try again later',
                type: 'error',
            })
        } finally {
            setIsRevoking(false)
        }
    }

    return (
        <DropdownMenu>
          <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
            <Button variant='ghost' className='flex gap-2 items-center'>
              <p>
                {isCreatingNew
                  ? 'Creating new key'
                  : isRevoking
                  ? 'Revoking key'
                  : 'Options'}
              </p>
              {isCreatingNew || isRevoking ? (
                <Loader2 className='animate-spin h-4 w-4' />
              ) : null}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(apiKeyKey)
    
                toast({
                  title: 'Copied',
                  message: 'API key copied to clipboard',
                  type: 'success',
                })
              }}>
              Copy
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={createNewApiKey}>
              Create new key
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={revokeCurrnetApiKey}>
              Revoke key
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
}

export default ApiKeyOptions