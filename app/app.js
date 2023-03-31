const loadInitialTemplate = () => {
    const template = `
        <h1>Pozos Petroleros</h1>
        <form id='pozo-form' style='display: grid; max-width: 350px;'>
            <div>
                <label>
                    Nombre del pozo:
                </label>
                <input name="name">
            </div>
            <div>
                <label>
                    Medida PSI:
                </label>
                <input name="psi">
            </div>
            <div>
                <label>
                    Fecha de la medición:
                </label>
                <input type="date" name="fecha">
            </div>
            <button type="submit">Enviar</button>
        </form>
        <ul id="pozos-list">
            
        </ul>
    `
    // Por nasch: const body = document.getElementByTagName('body')[0];
    const body = document.querySelector('body');
    body.innerHTML = template;
    body.style.fontFamily = 'system-ui';

    document.querySelectorAll('#pozo-form > div').forEach(e => {e.style.display = 'flex'});
    document.querySelectorAll('#pozo-form > div').forEach(e => {e.style.justifyContent = 'space-between'});
    document.querySelectorAll('#pozo-form > div').forEach(e => {e.style.marginBottom = '10px'});
}

const getPozos = async () => {
    const response = await fetch('/pozos');
    const pozos = await response.json();
    const template = pozo => `
        <li>
            ${pozo.name} <button data-id='${pozo._id}'>Ver histórico</button>
        </li>
    `;

    const pozosList = document.getElementById('pozos-list');
    pozosList.innerHTML = pozos.map(pozo => template(pozo)).join('');
    pozos.forEach(pozo => {
        const pozoNode = document.querySelector(`[data-id="${pozo._id}"]`);
        pozoNode.onclick = async () => {
            /* await fetch(`/users/${pozo._id}`, {
                method: 'GET',
            }); */
            alert(`El ID del pozo seleccionado es: ${pozo._id}`);
        }
    })
}

const addPozo = async () => {
    const pozoForm = document.getElementById('pozo-form');
    pozoForm.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(pozoForm);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        await fetch('/pozos', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json'
            }
        }).catch((e) => {console.log('Error: '+e)})
        pozoForm.reset();
        getPozos();
    }
}


window.onload = () => {
    loadInitialTemplate();
    getPozos();
    addPozo();
}