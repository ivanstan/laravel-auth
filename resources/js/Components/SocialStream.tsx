import React from 'react';
import InputError from '@/Components/InputError';
import ProviderIcon from '@/Components/SocialstreamIcons/ProviderIcon';
import useRoute from "@/Hooks/useRoute";
import {Provider} from "../../../vendor/joelbutcher/socialstream/stubs/breeze/inertia-vue-ts/resources/js/types";

interface Props {
    providers: Provider[];
    error: string|null;
    prompt: string;
}

const SocialStream = ({prompt = 'Or Login Via', error = null, providers = []}: Props) => {
    const route = useRoute();

    return (
        <div>
            {providers.length > 0 && (
                <div className="space-y-6 mt-6 mb-2">
                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink text-gray-400 px-6">{prompt}</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>

                    {error && <InputError message={error} className="text-center"/>}

                    <div className="grid gap-4">
                        {providers.map((provider) => (
                            <a
                                key={provider.id}
                                className="flex gap-2 items-center justify-center transition duration-200 border border-gray-400 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                                href={route('oauth.redirect', provider.id)}
                            >
                                <ProviderIcon provider={provider} classes="h-6 w-6 mx-2"/>
                                <span className="block font-medium text-sm text-gray-700">
                                {provider.buttonLabel || provider.name}
                            </span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialStream;
