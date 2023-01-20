import { useNavigate } from 'react-router-dom';
import {ReactComponent as ArrowSmallLeft} from '../../assets/icons/ArrowSmallLeft.svg';

export function BackButton({goTo}: {goTo: string }){
    const navigate = useNavigate()
    return (
    <button onClick={() => navigate(goTo)} className="filledPrimary round w-fit h-fit m-4 rounded-3xl" type="button" title="Back">
        <ArrowSmallLeft className='w-16 h-14 rounder3xl fill-white' />
    </button>
    )
}