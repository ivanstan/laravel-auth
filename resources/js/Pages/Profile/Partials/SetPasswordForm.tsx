import React, {useState, useRef} from 'react';
import {useForm} from '@inertiajs/react';
import ActionMessage from '@/Components/ActionMessage';
import PrimaryButton from '@/Components/PrimaryButton';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import useRoute from "@/Hooks/useRoute";
import classNames from "classnames";

function SetPasswordForm() {
    const route = useRoute();
    const passwordInput = useRef<HTMLInputElement>(null);
    const form = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const setPassword = () => {
        form.post(route('user-password.set'), {
            errorBag: 'setPassword',
            preserveScroll: true,
            onSuccess: () => form.reset(),
            onError: () => {
                if (form.errors.password) {
                    form.reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (form.errors.current_password) {
                    form.reset('current_password');
                    passwordInput.current?.focus();
                }
            },
        });
    };

    return (
        <FormSection onSubmit={setPassword}
                     description={'Ensure your account is using a long, random password to stay secure.'}
                     title={'Set Password'}
                     renderActions={() => (
                         <>
                             <ActionMessage on={form.recentlySuccessful} className="mr-3">
                                 Saved.
                             </ActionMessage>

                             <PrimaryButton
                                 className={classNames({'opacity-25': form.processing})}
                                 disabled={form.processing}
                             >
                                 Save
                             </PrimaryButton>
                         </>
                     )}
        >


            <div className="col-span-6 sm:col-span-4">
                <InputLabel htmlFor="password" value="New Password"/>
                <TextInput
                    id="password"
                    ref={passwordInput}
                    value={form.data.password}
                    onChange={(e) => form.setData('password', e.target.value)}
                    autoComplete="new-password"
                    className="mt-1 block w-full"
                    type="password"
                />
                <InputError message={form.errors.password} className="mt-2"/>
            </div>
            <div className="col-span-6 sm:col-span-4">
                <InputLabel htmlFor="password_confirmation" value="Confirm Password"/>
                <TextInput
                    id="password_confirmation"
                    value={form.data.password_confirmation}
                    onChange={(e) => form.setData('password_confirmation', e.target.value)}
                    autoComplete="new-password"
                    className="mt-1 block w-full"
                    type="password"
                />
                <InputError message={form.errors.password_confirmation} className="mt-2"/>
            </div>

        </FormSection>
    );
}

export default SetPasswordForm;
