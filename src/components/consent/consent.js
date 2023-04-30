import { useState, useRef } from 'react';
import { userActions } from '../../store/slices/user-slice';
import { useSelector, useDispatch } from 'react-redux';

function Consent() {
    const [useFunctionalCookies, setUseFunctionalCookies] = useState(false);
    const [useAnalyticsCookies, setUseAnalyticsCookies]   = useState(false);
    const functionalCookiesSwitchRef = useRef();
    const analyticsCookiesSwitchRef  = useRef();
    const functionalCookiesSliderRef = useRef();
    const analyticsCookiesSliderRef  = useRef();
    const aboutCookiesRef            = useRef();
    const typeOfCookiesRef           = useRef();
    const isConsent = useSelector((state) => state.user.isConsent);
    const dispatch = useDispatch();

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
        switch (e.target.id) {
            case 'functional-cookies-switch':
                e.target.style.backgroundColor = useFunctionalCookies == false ? 'lightskyblue' : 'lightgray';
                functionalCookiesSliderRef.current.style.float = useFunctionalCookies == false ? 'right' : 'left';
                setUseFunctionalCookies(useFunctionalCookies == false ? true : false);
            break;

            case 'analytics-cookies-switch':
                e.target.style.backgroundColor = useAnalyticsCookies == false ? 'lightskyblue' : 'lightgray';
                analyticsCookiesSliderRef.current.style.float = useAnalyticsCookies == false ? 'right' : 'left';
                setUseAnalyticsCookies(useAnalyticsCookies == false ? true : false);
            break;

            case 'all-cookies-btn':
                functionalCookiesSwitchRef.current.style.backgroundColor = 'lightskyblue';
                analyticsCookiesSwitchRef.current.style.backgroundColor  = 'lightskyblue';
                functionalCookiesSliderRef.current.style.float           = 'right';
                analyticsCookiesSliderRef.current.style.float            = 'right';
                setUseFunctionalCookies(true);
                setUseAnalyticsCookies(true);
                dispatch(userActions.setConsentAndCookiePreferences(
                {
                    useFunctionalCookies: true,
                    useAnalyticsCookies:  true,    
                }));
            break;

            case 'selected-cookies-btn':
                dispatch(userActions.setConsentAndCookiePreferences(
                {
                    useFunctionalCookies: useFunctionalCookies,
                    useAnalyticsCookies:  useAnalyticsCookies,
                }));
            break;

            default:
                functionalCookiesSwitchRef.current.style.backgroundColor = 'lightgray';
                analyticsCookiesSwitchRef.current.style.backgroundColor  = 'lightgray';
                functionalCookiesSliderRef.current.style.float           = 'left';
                analyticsCookiesSliderRef.current.style.float            = 'left';
                setUseFunctionalCookies(false);
                setUseAnalyticsCookies(false);
                dispatch(userActions.setConsentAndCookiePreferences(
                {
                    useFunctionalCookies: false,
                    useAnalyticsCookies:  false,
                }));
            break;
        }
    }

    return (
        <div id="consent">
            <button id="close-cookies-banner-btn" disabled={isConsent == false}>&#x2715;</button>
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
                        <div id="necessary-cookies-switch" className="cookies-switch">
                            <div id="necessary-cookies-slider" className="cookies-slider"></div>
                        </div>
                    </div>
                    <div className="row">
                        <h4 className="consent-heading">Funktionella</h4>
                        <div id="functional-cookies-switch" className="cookies-switch" 
                            ref={functionalCookiesSwitchRef} onClick={(e) => setCookiePreferences(e)}>
                            <div className="cookies-slider" ref={functionalCookiesSliderRef}></div>
                        </div>
                    </div>
                    <div className="row">
                        <h4 className="consent-heading">Analytiska</h4>
                        <div id="analytics-cookies-switch" className="cookies-switch"
                            ref={analyticsCookiesSwitchRef} onClick={(e) => setCookiePreferences(e)}>
                            <div className="cookies-slider" ref={analyticsCookiesSliderRef}></div>
                        </div>
                    </div>
                </div>
                <button id="all-cookies-btn" className="consent-btn" onClick={(e) => setCookiePreferences(e)}>Alla</button>
                <button id="selected-cookies-btn" className="consent-btn" disabled={!useFunctionalCookies && !useAnalyticsCookies} 
                    onClick={(e) => setCookiePreferences(e)}>Urval</button>
                <button id="necessary-cookie-btn" className="consent-btn" onClick={(e) => setCookiePreferences(e)}>
                    Endast nödvändiga</button>
            </div>
        </div>
    );
}

export default Consent;