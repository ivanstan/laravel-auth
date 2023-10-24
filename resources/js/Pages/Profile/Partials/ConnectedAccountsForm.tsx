import React, {useState, useRef} from 'react';
import ActionLink from '@/Components/ActionLink';
import ActionSection from '@/Components/ActionSection';
import ConnectedAccount from '@/Components/ConnectedAccount';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import {useForm, usePage} from "@inertiajs/react";
import useRoute from "@/Hooks/useRoute";
import {Provider} from "../../../../../vendor/joelbutcher/socialstream/stubs/breeze/inertia-vue-ts/resources/js/types";
import {Page} from "@inertiajs/core";
import FormSection from "@/Components/FormSection";

function ConnectedAccounts() {
    const accountId = useRef(null);
    const [confirmingRemoveAccount, setConfirmingRemoveAccount] = useState<boolean>(false);
    const passwordInput = useRef(null);

    const form = useForm({password: ''});
    const page: Page<any> = usePage(); // You should provide the equivalent functionality for retrieving page props.
    const route = useRoute();

    const getAccountForProvider = (provider: Provider) =>
        page.props.socialstream.connectedAccounts
            .filter((account) => account.provider === provider.id)
            .shift();

    const confirmRemoveAccount = (id) => {
        accountId.current = id;
        setConfirmingRemoveAccount(true);

        setTimeout(() => passwordInput.current.focus(), 250);
    };

    const closeModal = () => {
        setConfirmingRemoveAccount(false);
        form.setData('password', '');
    };

    const setProfilePhoto = (id) => {
        form.put(route('user-profile-photo.set', { id }), {
            preserveScroll: true
        });
    };

    const removeAccount = () => {
        console.log(accountId);
        form.delete(route('connected-accounts.destroy', { id: accountId.value }), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.value.focus(),
            onFinish: () => form.reset(),
        });
    };

    return (
        <ActionSection description={'Manage and remove your connected accounts.'} title={'Connected Accounts'}>
            <h3 className="text-lg font-medium text-gray-900">
                {page.props.socialstream.connectedAccounts.length === 0
                    ? 'You have no connected accounts.'
                    : 'Your connected accounts.'}
            </h3>
            <div className="mt-3 max-w-xl text-sm text-gray-600">
                You are free to connect any social accounts to your profile and may remove any connected accounts at any
                time. If you feel any of your connected accounts have been compromised, you should disconnect them
                immediately and change your password.
            </div>
            <div className="mt-5 space-y-6">
                {page.props.socialstream.providers.map((provider: Provider) => (
                    <ConnectedAccount
                        key={provider.id}
                        provider={provider}
                        createdAt={getAccountForProvider(provider)?.created_at}
                    >
                        <div slot="action">
                            {getAccountForProvider(provider) ? (
                                <div className="flex items-center space-x-6">
                                    {page.props.jetstream.managesProfilePhotos &&
                                        getAccountForProvider(provider).avatar_path && (
                                            <button
                                                onClick={() => setProfilePhoto(getAccountForProvider(provider).id)}
                                                className="cursor-pointer ml-6 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                                            >
                                                Use Avatar as Profile Photo
                                            </button>
                                        )}
                                    {page.props.socialstream.connectedAccounts.length > 1 || page.props.socialstream.hasPassword ? (
                                        <DangerButton
                                            onClick={() => confirmRemoveAccount(getAccountForProvider(provider).id)}>
                                            Remove
                                        </DangerButton>
                                    ) : null}
                                </div>
                            ) : (
                                <ActionLink href={route('oauth.redirect', {provider})}>Connect</ActionLink>
                            )}
                        </div>
                    </ConnectedAccount>
                ))}
            </div>
            <DialogModal isOpen={confirmingRemoveAccount} onClose={closeModal}>
                <DialogModal.Content title={'Are you sure you want to remove this account?'}>
                    Please enter your password to confirm you would like to remove this account.
                    <div className="mt-4">
                        <TextInput
                            ref={passwordInput}
                            value={form.data.password}
                            onChange={(e) => form.setData('password', e.target.value)}
                            type="password"
                            className="mt-1 block w-3/4"
                            placeholder="Password"
                            autoComplete="current-password"
                            onKeyUp={(e) => e.key === 'Enter' && removeAccount()}
                        />
                        {form.errors && <InputError message={form.errors.password} className="mt-2"/>}
                    </div>
                </DialogModal.Content>
                <DialogModal.Footer>
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                    <PrimaryButton
                        className={form.processing ? 'opacity-25' : ''}
                        onClick={removeAccount}
                        disabled={form.processing}
                        style={{marginLeft: '0.5rem'}}
                    >
                        Remove Account
                    </PrimaryButton>
                </DialogModal.Footer>
            </DialogModal>
        </ActionSection>
    );
}

export default ConnectedAccounts;
