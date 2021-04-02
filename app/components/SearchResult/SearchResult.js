import { useState } from 'react';
import Link from 'next/link';
import styles from './SearchResult.module.css';
import Loading from '../Loading/Loading';
import NextDays from '../NextDays/NextDays';

export default function SearchResult(props) {
    const [yesterday, setYesterday] = useState(props.content.yesterday);
    const [yesterday_diff, setYesterday_diff] = useState(props.content.yesterday_diff);
    const [yesterday_1, setYesterday_1] = useState(props.content.yesterday_1);

    // variasveis para manter o valor da pagina estatico até fazer outra requisição
    const yesterdayStatic = props.content.yesterday;
    const yesterday_diffStatic = props.content.yesterday_dif;
    const yesterday_1Static = props.content.yesterday_1;

    // função para enviar os dados de uma nova requisição
    function submit() {
        let content = {}
        content.yesterday = yesterday;
        content.yesterday_1 = yesterday_1;
        content.yesterday_diff = yesterday - yesterday_1;

        props.NewSearch(content)
    }

    if (props.dataSearch.result) {
        return(
            <div>
                <div className={`${styles.header} margin-page`}>
                    <div onClick={() => window.location.reload()} className={styles.headerPage}>
                        <img src="./logo.png" className={styles.logo}/>
                    </div>
                    <div className={styles.noneLess1024} style={{ marginBottom: 56 }}>
                        <form onSubmit={() => submit()}>
                            <div className={styles.headerInputContainer}>
                                <p className='inputTitle'>Hoje</p>
                                <input className='inputContent' type="number" value={yesterday} onChange={e => setYesterday(e.target.value)} required/>
                            </div>
                            
                            <div className={styles.headerInputContainer}>
                                <p className='inputTitle'>Ontem</p>
                                <input className='inputContent' type="number" value={yesterday_1} onChange={e => setYesterday_1(e.target.value)} required/>
                            </div>
                            
                            <div className={styles.headerInputContainer} style={{ display: 'none' }}>
                                <p className='inputTitle'>Valor do dia anterior</p>
                                <input className='inputContent' type="number" value={yesterday_diff} onChange={e => setYesterday_diff(e.target.value)} required/>
                            </div>

                            <div className={styles.headerInputContainer} style={{ marginRight: 0, width: 40 }}>
                                <div className='buttonSubmit' style={{ marginTop: 26 }}>
                                    <label htmlFor="send">
                                        <input id="send" type="submit" style={{ display: 'none' }}/>
                                        <i className="fas fa-redo-alt" style={{ padding: 12, cursor: 'pointer' }}></i>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={`${styles.body} margin-page`} style={{ marginBottom: 24 }}>
                    <div style={{ marginTop: 24 }}>
                        <h1 className="title-card">Previsão da cotação de amanhã</h1>
                        <div className="card responsiveColumn" style={{ justifyContent: "space-between"}}>
                            <div style={{ width: '100%' }}>
                                <p style={{ fontSize: 24, margin: '16px 0' }}>Preço da saca:</p>
                                <p style={{ fontWeight: 'bold', fontSize: 88, color: '#AAFFA9' }}>R$ {props.dataSearch.result.toFixed(2).replace('.', ',')}</p>
                            </div>
                            <div style={{ width: '100%' }}>
                                <p style={{ fontSize: 24, margin: '16px 0' }}>Porcentagem de acertividade(PA):</p>
                                <p style={{ fontWeight: 'bold', fontSize: 88, color: '#AAFFA9' }}>PA: 99,85 %</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="responsiveColumn" style={{ margin: '56px 0', display: 'flex' }}>
                        <NextDays title="Em 02 dias" value={"7.4"}/>
                        <NextDays title="Em 03 dias" value={"7.4"}/>
                        <NextDays title="Em 04 dias" value={"7.4"}/>
                        <NextDays title="Em 05 dias" value={"7.4"}/>
                        <NextDays title="Em 06 dias" value={"7.4"}/>
                        <NextDays title="Em 07 dias" value={"7.4"} marginRight={0}/>
                    </div> */}
                </div>
                <div className={styles.noneMore1024} onClick={() => window.location.reload()}>
                    <div className='inputContainer' style={{ fontWeight: 'bold' , paddingBottom: '12vh'}}>
                        <button className='buttonSubmit'> Nova consulta </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loading />;
    }
}
