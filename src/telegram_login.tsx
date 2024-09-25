import React, { useRef, useEffect } from "react";


export interface TelegramAuthData {
  id: number;
  first_name: string;
  auth_date: number;
  hash: string;
  last_name?: string;
  photo_url?: string;
  username?: string;
}

export interface CreateScriptOptions extends TelegramLoginProps { }

export type TTelegramAuthLogin = Pick<TelegramLoginProps, 'onAuthCallback'>;


declare global {
  interface Window {
    TelegramAuthLogin: TTelegramAuthLogin;
  }
}


/**
 * It creates a script tag with the right attributes to load the Telegram widget
 *
 * @see https://core.telegram.org/widgets/login
 *
 * @param {CreateScriptOptions} options - The options to create the script.
 * @returns A script element
 */
export function createScript({
  authCallbackUrl,
  botUsername,
  buttonSize = 'large',
  cornerRadius,
  lang = 'en',
  onAuthCallback,
  requestAccess = 'write',
  showAvatar = true,
  widgetVersion = 21,
}: CreateScriptOptions): HTMLScriptElement {
  const script = document.createElement('script');

  script.async = true;

  script.src = `https://telegram.org/js/telegram-widget.js?${widgetVersion}`;
  script.setAttribute('data-telegram-login', botUsername);
  script.setAttribute('data-size', buttonSize);
  if (cornerRadius) {
    script.setAttribute('data-radius', `${cornerRadius}`);
  }
  if (requestAccess) {
    script.setAttribute('data-request-access', requestAccess);
  }
  script.setAttribute('data-userpic', JSON.stringify(Boolean(showAvatar)));
  script.setAttribute('data-lang', lang);

  if (authCallbackUrl) {
    script.setAttribute('data-auth-url', authCallbackUrl);
  } else if (onAuthCallback) {
    script.setAttribute('data-onauth', 'TelegramAuthLogin.onAuthCallback(user)');
  }

  return script;
}

function initTelegramAuthLogin(options: TTelegramAuthLogin) {
  window.TelegramAuthLogin = options;
}


export interface TelegramLoginProps {
  /**
   * The URL where the auth data from Telegram will be sent.
   */
  authCallbackUrl?: string;

  botUsername: string;

  /**
   * The size of the button.
   *
   * @default 'large'
   */
  buttonSize?: 'large' | 'medium' | 'small';

  /**
   * The radius of the button corners.
   */
  cornerRadius?: number;

  /**
   * The language of the button.
   *
   * @default "en"
   */
  lang?: string;

  /**
   * The callback function that will be called when the user is authenticated.
   */
  onAuthCallback?: (data: TelegramAuthData) => void;

  /**
   * The access level that the bot will request.
   *
   * @default "write"
   */
  requestAccess?: 'write' | null;

  /**
   * Whether to show the user's avatar.
   *
   * @default true
   */
  showAvatar?: boolean;

  /**
   * The version of the Telegram widget to deal with browser caching.
   */
  widgetVersion?: number | string;
}

export function TelegramLogin(props: TelegramLoginProps) {
  const hiddenDivRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement>();

  useEffect(() => {
    // destroy the existing script element
    scriptRef.current?.remove();

    // init the global variable
    initTelegramAuthLogin({ onAuthCallback: props.onAuthCallback });

    // create a new script element and save it
    scriptRef.current = createScript(props);

    // add the script element to the DOM
    hiddenDivRef.current?.appendChild(scriptRef.current)
    // hiddenDivRef.current?.after(scriptRef.current);
  }, [props]);

  return <div ref={hiddenDivRef} />;
}

export function TelegramLoginV2(props: TelegramLoginProps) {

}