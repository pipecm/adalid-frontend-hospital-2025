const HospitalInfo = () => {
    return (
        <div>
            <h1 className="welcome__title">Bienvenido al Hospital San Itario</h1>
            <p className="welcome__tfs">En este centro asistencial usted puede atenderse las 24 horas del día, los 365 días del año, los 7 días de la semana.</p>
            <div className="values">
                <div className="values__card card text-bg-primary mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Misión</h5>
                        <p className="card-text">Nuestra misión es proporcionar a los pacientes una atención rápida y eficiente, poniendo su salud y su bienestar como máxima prioridad.</p>
                    </div>
                </div>
                <div className="values__card card text-bg-success mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Visión</h5>
                        <p className="card-text">Nuestra visión es ser reconocido  por la comunidad en general como uno de los centros médicos de mayor prestigio de la ciudad y del país.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HospitalInfo;

    