import { useState } from 'react';
import styles from './SearchForm.module.css';

export default function SearchForm(props) {
    // const cities = [{name: 'Marília - SP'}, {name: 'Pompéia - SP'}, {name: 'Oriente - SP'}];
    // const cultures = [{name: 'Milho'}, {name: 'Soja'}];
    // const [city, setCity] = useState('');
    // const [culture, setCulture] = useState('');
    // const [dayStart, setDayStart] = useState('');
    // const [dayEnd, setDayEnd] = useState('');
    // const [plantedArea, setPlantedArea] = useState('');
    const [yesterday, setYesterday] = useState();
    const [yesterday_1, setYesterday_1] = useState();
    const [yesterday_diff, setYesterday_diff] = useState();
    const [ask, setAsk] = useState(false);

    // função para enviar os dados de uma nova requisição
    function submit() {
        let content = {}
        content.yesterday = yesterday;
        content.yesterday_1 = yesterday_1;
        content.yesterday_diff = yesterday - yesterday_1;

        props.NewSearch(content)
    }

    return(
        <div className={styles.containerPage}>
            <div className={styles.containerImage}>
                <img src="./logo.png" className={styles.logo}/>
                <p className={styles.logoText}>Sua calculadora para<br /><strong>cotação de soja</strong></p>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginTop: 24, cursor: 'pointer'}} onClick={() => ask ? setAsk(false) : setAsk(true) }>
                    <img src="./question.png" style={{ marginBottom: 12, width: 24, height: 24 }} />
                    {!ask ? <p style={{ marginLeft: 12, textDecoration: 'underline' }}>Como usar a plataforma?</p> :
                        <p style={{ marginLeft: 12 }}>No formulário ao lado, insira os valores<br />em R$ de sua cotação de 2 dias consecutivos<br />para estimar o valor do próximo dia.</p>
                    }
                </div>
            </div>
            <form className={styles.containerForm} onSubmit={()=>submit()} name="form" noValidate>
                <h1 className='inputContainer'>Insira os valores das cotações em R$:</h1>
                
                <div className='inputContainer'>
                    <p className='inputTitle'>Valor da cotação de hoje</p>
                    <div style={{ display: 'flex'}}>
                        <p style={{ padding: '0 8px', fontSize: 24, height: '100%', display: 'flex', backgroundColor: "#fff", color: '#333', alignItems: 'center', borderRadius: '4px 0 0 4px'}}>R$ </p>
                        <input className='inputContent' min="0" type="number" defaultValue={yesterday} onChange={e => setYesterday(e.target.value)} required placeholder="0.00" style={{ borderRadius: '0 4px 4px 0' }}/>
                    </div>
                </div>
                
                <div className='inputContainer'>
                    <p className='inputTitle'>Valor da cotação de ontem</p>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <p style={{ padding: '0 8px', fontSize: 24, height: '100%', display: 'flex', backgroundColor: "#fff", color: '#333', alignItems: 'center', borderRadius: '4px 0 0 4px'}}>R$ </p>
                        <input className='inputContent' min="0" type="number" defaultValue={yesterday_1} onChange={e => setYesterday_1(e.target.value)} required placeholder="0.00" style={{ borderRadius: '0 4px 4px 0' }}/>
                    </div>
                </div>
                
                <div className='inputContainer' style={{ display: 'none' }}>
                    <p className='inputTitle'>Diferença de ontem e anteontem</p>
                    <input className='inputContent' type="number" value={yesterday_diff} onChange={e => setYesterday_diff(e.target.value)} required/>
                </div>

                <div className='inputContainer' style={{ fontWeight: 'bold' }}>
                    <input className='buttonSubmit' type="submit" />
                </div>
            </form>
        </div>
    )
};