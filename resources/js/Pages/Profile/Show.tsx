import React from 'react';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import LogoutOtherBrowserSessions from '@/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm';
import TwoFactorAuthenticationForm from '@/Pages/Profile/Partials/TwoFactorAuthenticationForm';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import useTypedPage from '@/Hooks/useTypedPage';
import SectionBorder from '@/Components/SectionBorder';
import AppLayout from '@/Layouts/AppLayout';
import { Session } from '@/types';
import {Socialstream} from "../../../../vendor/joelbutcher/socialstream/stubs/breeze/inertia-vue-ts/resources/js/types";
import SetPasswordForm from "@/Pages/Profile/Partials/SetPasswordForm";
import ConnectedAccountsForm from "@/Pages/Profile/Partials/ConnectedAccountsForm";

interface Props {
  sessions: Session[];
  confirmsTwoFactorAuthentication: boolean;
  socialstream: Socialstream;
}

export default function Show({
  sessions,
  confirmsTwoFactorAuthentication,
  socialstream
}: Props) {
  const page = useTypedPage();

  return (
    <AppLayout
      title={'Profile'}
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Profile
        </h2>
      )}
    >
      <div>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          {page.props.jetstream.canUpdateProfileInformation ? (
            <div>
              <UpdateProfileInformationForm user={page.props.auth.user!} />

              <SectionBorder />
            </div>
          ) : null}

          {page.props.jetstream.canUpdatePassword  && socialstream.hasPassword ? (
            <div className="mt-10 sm:mt-0">
              <UpdatePasswordForm />

              <SectionBorder />
            </div>
          ) : (
              <div className="mt-10 sm:mt-0">
                <SetPasswordForm/>

                <SectionBorder/>
              </div>
          )}

          {page.props.jetstream.canManageTwoFactorAuthentication && socialstream.hasPassword ? (
            <div className="mt-10 sm:mt-0">
              <TwoFactorAuthenticationForm
                requiresConfirmation={confirmsTwoFactorAuthentication}
              />

              <SectionBorder />
            </div>
          ) : null}

          {socialstream.show && (
              <div className="mt-10 sm:mt-0">
                <ConnectedAccountsForm/>

                <SectionBorder />
              </div>
          )}

          <div className="mt-10 sm:mt-0">
            <LogoutOtherBrowserSessions sessions={sessions} />
          </div>

          {page.props.jetstream.hasAccountDeletionFeatures && socialstream.hasPassword ? (
            <>
              <SectionBorder />

              <div className="mt-10 sm:mt-0">
                <DeleteUserForm />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
}
