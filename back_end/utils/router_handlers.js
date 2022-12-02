
/**
 * entityToEditModel (i want to edit this) [referenceFromEntityToEdit]._id === reffedModelId <-> reffedModel [referenceFromReffedModel]
 * 
 * @param entityToEditModel 
 * @param reffedModel 
 * @param referenceFromEntityToEdit 
 * @param referenceFromReffedModel 
 * @returns 
 */
const genericPutEndpointHandler = (entityToEditModel, reffedModel, referenceFromEntityToEdit, referenceFromReffedModel, exceptionHandlerCallback) => (async (req, res) => {
    // entityToEditModel is already populated.
    try {
        const { id: dbEntityToEditID } = req.params
        const bodyToPutInEntityToEdit = req.body
        const { _id: reffedModelId } = req.body[referenceFromEntityToEdit] || { _id: null };

        bodyToPutInEntityToEdit[referenceFromEntityToEdit] = reffedModelId; // reffedModelId === bodyToPutInEntityToEdit[referenceFromEntityToEdit]._id
        if (reffedModelId && await entityToEditModel.findOne({[referenceFromEntityToEdit]: reffedModelId})) {
            return res.status(409).json({ message: `another entity [${entityToEditModel}] has subject` })
        }

        const foundEntityToEdit = await entityToEditModel.findById({ _id: dbEntityToEditID })
        if (!foundEntityToEdit) {
            return res.json({ message: `Entity [${entityToEditModel}] not found: ${dbEntityToEditID}` })
        }

        let oldReffedEntityId = foundEntityToEdit[referenceFromEntityToEdit];
        let oldReffedEntity;
        if (oldReffedEntityId) {
            oldReffedEntity = await reffedModel.findByIdAndUpdate({ _id: oldReffedEntityId }, { $set: { [referenceFromReffedModel]: null } })
        }

        Object.assign(foundEntityToEdit, bodyToPutInEntityToEdit);
        const updatedEntity = await (new entityToEditModel(foundEntityToEdit).save());
        let updatedReffedEntity;
        if (reffedModelId) {
            updatedReffedEntity = await reffedModel.findByIdAndUpdate({ _id: reffedModelId }, { $set: { [referenceFromReffedModel]: dbEntityToEditID } })
        }
        
        return res.status(200).json({ message: `Entity [${entityToEditModel}] updated, ${updatedEntity}` })
    } catch (e) {
        console.log(e)
        exceptionHandlerCallback(req, res, e)
    }
})

module.exports = { genericPutEndpointHandler }