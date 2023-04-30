import { useRef } from 'react';
import { userActions } from '../../store/slices/user-slice';
import { useSelector, useDispatch } from 'react-redux';

function Consent() {
    const isConsent                  = useSelector((state) => state.user.isConsent);
    const useFunctionalCookies       = useSelector((state) => state.user.cookiePreferences.useFunctionalCookies);
    const useAnalyticsCookies        = useSelector((state) => state.user.cookiePreferences.useAnalyticsCookies);
    const functionalCookiesSwitchRef = useRef();
    const analyticsCookiesSwitchRef  = useRef();
    const functionalCookiesSliderRef = useRef();
    const analyticsCookiesSliderRef  = useRef();
    const aboutCookiesRef            = useRef();
    const typeOfCookiesRef           = useRef();
    const dispatch                   = useDispatch();

    const toggleInfo = (e) => {
        e.preventDefault();

        if (e.target.id == 'about-cookies-expand') {
            aboutCookiesRef.current.style.display = e.target.innerHTML == '+' ? 'block' : 'none';
        
        } else {
            typeOfCookiesRef.current.style.display = e.target.innerHTML == '+' ? 'block' : 'none';
        }

        e.target.innerHTML = e.target.innerHTML == '+' ? '–' : '+';
    }

    const setCookiePreferences = (e) => {
        if (e.target.id == 'functional-cookies-switch') {
            e.target.className = useFunctionalCookies ? 'cookies-switch' : 'cookies-switch-enabled';
            functionalCookiesSliderRef.current.className = useFunctionalCookies ? 'cookies-slider' : 
                'cookies-slider-enabled';
        
        } else {
            e.target.className = useAnalyticsCookies ? 'cookies-switch' : 'cookies-switch-enabled';
            analyticsCookiesSliderRef.current.className = useAnalyticsCookies ? 'cookies-slider' : 
                'cookies-slider-enabled';
        }
    }

    const saveCookiePreferences = (e) => {
        if (e.target.id == 'all-cookies-btn') {
            functionalCookiesSwitchRef.current.className = 'cookies-switch-enabled';
            analyticsCookiesSwitchRef.current.className = 'cookies-switch-enabled';
            functionalCookiesSliderRef.current.className = 'cookies-slider-enabled';
            analyticsCookiesSliderRef.current.className = 'cookies-slider-enabled';
        
        } else if (e.target.id == 'necessary-cookie-btn') {
            functionalCookiesSwitchRef.current.className = 'cookies-switch';
            analyticsCookiesSwitchRef.current.className = 'cookies-switch';
            functionalCookiesSliderRef.current.className = 'cookies-slider';
            analyticsCookiesSliderRef.current.className = 'cookies-slider';
        }

        dispatch(userActions.setConsentAndCookiePreferences(
            {
                useFunctionalCookies: functionalCookiesSwitchRef.current.className == 'cookies-switch-enabled',
                useAnalyticsCookies: analyticsCookiesSwitchRef.current.className == 'cookies-switch-enabled',
            }
        ))
    }

    function handleButtonClick() {
        dispatch(userActions.toggleCookiesBanner(false));
    }

    return (
        <div id="consent">
            <button id="close-cookies-banner-btn" disabled={isConsent == false} onClick={() => handleButtonClick()}>
                &#x2715;</button>
            <div id="consent-inner-wrap">
                <h2>Vi behöver ditt samtycke</h2>
                <p>Vi använder cookies för att förbättra vår webbplats och för att anpassa din upplevelse.</p>
                <h3 className="consent-heading">Mer info</h3>
                <div className="cookies-expand">
                    <a id="about-cookies-expand" href="" onClick={(e) => toggleInfo(e)}>+</a>
                </div>
                <div id="about-cookies" ref={aboutCookiesRef}>
                    <p>Cookies är små textfiler som lagras på din enhet och som lagrar information om din
                        användning av webbplatsen.
                    </p>
                </div>
                <h3 className="consent-heading">Anpassa</h3>
                <div className="cookies-expand">
                    <a id="type-of-cookies-expand" href="" onClick={(e) => toggleInfo(e)}>+</a>
                </div>
                <div id="types-of-cookies" ref={typeOfCookiesRef}>
                    <div className="row">
                        <h4 className="consent-heading">Nödvändiga</h4>
                        <div id="necessary-cookies-switch" className="cookies-switch-enabled">
                            <div className="cookies-slider-enabled"></div>
                        </div>
                    </div>
                    <div className="row">
                        <h4 className="consent-heading">Funktionella</h4>
                        <div id="functional-cookies-switch" className={useFunctionalCookies ? 'cookies-switch-enabled' : 
                            'cookies-switch'} ref={functionalCookiesSwitchRef} onClick={(e) => setCookiePreferences(e)}>
                            <div className={useFunctionalCookies ? 'cookies-slider-enabled' : 'cookies-slider'} 
                                ref={functionalCookiesSliderRef}></div>
                        </div>
                    </div>
                    <div className="row">
                        <h4 className="consent-heading">Analytiska</h4>
                        <div id="analytics-cookies-switch" className={useAnalyticsCookies ? 'cookies-switch-enabled' : 
                            'cookies-switch'} ref={analyticsCookiesSwitchRef} onClick={(e) => setCookiePreferences(e)}>
                            <div className={useAnalyticsCookies ? 'cookies-slider-enabled' : 'cookies-slider'} 
                                ref={analyticsCookiesSliderRef}></div>
                        </div>
                    </div>
                </div>
                <button id="all-cookies-btn" className="consent-btn" onClick={(e) => saveCookiePreferences(e)}>Alla</button>
                <button id="selected-cookies-btn" className="consent-btn" disabled={!useFunctionalCookies && !useAnalyticsCookies} 
                    onClick={(e) => saveCookiePreferences(e)}>Urval</button>
                <button id="necessary-cookie-btn" className="consent-btn" onClick={(e) => saveCookiePreferences(e)}>
                    Endast nödvändiga</button>
            </div>
        </div>
    );
}

export default Consent;