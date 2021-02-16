export function pushConsultantProfile(obj, parameter) {
    let objLink = {
        name: 'ConsultantProfile',
        params: {
            prObjConsultantData: Object.assign(parameter)
        }
    }

    obj.$router.push(objLink).catch({})
}