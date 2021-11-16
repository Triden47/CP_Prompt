import { useEffect, useState } from 'react'
import moment from 'moment';
import { StyledEngineProvider } from '@mui/styled-engine';

const Timer = (props) => {
    
    const [HH, setHH] = useState(null);
    const [MM, setMM] = useState(null);
    const [SS, setSS] = useState(null);
    const [D, setD] = useState(null)
    
    useEffect(() => {
        
        let now = moment()
        // let end = moment(moment(props.start_end).format('DD/MM/YYYY hh:mm'), 'DD/MM/YYYY hh:mm')
        let end = moment.utc(moment.utc(props.start_end, 'YYYY-MM-DD hh:mm:ss A').format('DD/MM/YYYY hh:mm A'), 'DD/MM/YYYY hh:mm A')
        console.log(now)
        console.log(end)
        let d = end.diff(now, 'days')
        console.log(d)
        let h  = end.diff(now, 'hours');
        let m  = end.diff(now, 'minutes') - (60 * h);
        let s  = end.diff(now, 'seconds') - (60 * 60 * h) - (60 * m);
        
        let hh = ('0' + h).slice(-2);
        let mm = ('0' + m).slice(-2);
        let ss = ('0' + s).slice(-2);
        
        setTimeout(() => {
            setD(d)
            setHH(hh)
            setMM(mm)
            setSS(ss)
            
        }, 1000);
        
    }, [SS]);
    
    return(
        <>
            { D > 0 ? `${D} days` : `${HH}:${MM}:${SS}`}
        </>
    );
    
}

export default Timer;