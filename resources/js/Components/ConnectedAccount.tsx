import React, {ReactNode} from 'react';
import ProviderIcon from "@/Components/SocialstreamIcons/ProviderIcon";
import {Provider} from "../../../vendor/joelbutcher/socialstream/stubs/breeze/inertia-vue-ts/resources/js/types";

interface Props {
    provider: Provider;
    createdAt: string|null;
    children: ReactNode;
}

const ConnectedAccount = ({provider, createdAt = null, children}: Props) => {
    return (
        <div>
            <div className="px-3 flex items-center justify-between">
                <div className="flex items-center">
                    <ProviderIcon provider={provider} classes="h-6 w-6 mr-2"/>

                    <div className="ml-2">
                        <div className="text-sm font-semibold text-gray-600">{provider.name}</div>

                        {createdAt !== null ? (
                            <div className="text-xs text-gray-500">Connected {createdAt}</div>
                        ) : (
                            <div className="text-xs text-gray-500">Not connected.</div>
                        )}
                    </div>
                </div>

                {children}
            </div>
        </div>
    );
};

export default ConnectedAccount;
