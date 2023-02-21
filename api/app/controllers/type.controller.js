const TypeService = require("../services/type.services")
const slugify = require("slugify");
;
class TypeController {
    constructor() {
        this.type_svc = new TypeService();
    }
    getAlllists = async (req, res, next) => {
        try {
            let result = await this.type_svc.getAllTypes(req.type);
            res.json
                (
                    {
                        result: result,
                        status: true,
                        msg: req.type + " " + "fetched"
                    }
                )
        }
        catch (exception) {
            console.log("getAllLists:", exception);
            next({ status: 422, msg: exception })
        }
    }
    createContent = async (req, res, next) => {
        try {
            let data = req.body
            data.type = req.type
            if (req.file) {
                data.image = req.file.filename;
            }
            if (!data.link || data.link === "null") {
                data.link = slugify(data.title, { lower: true })
            }
            await this.type_svc.validateData(data)

            let response = await this.type_svc.saveContent(data);

            if (response) {
                res.json
                    (
                        {
                            result: data,
                            status: true,
                            msg: req.type + " created"
                        }
                    )
            }
            else {
                throw "Problem while creating content"
            }
        }
        catch (exception) {
            console.log("createContent:", exception);
            next({ status: 422, msg: exception })
        }
    }
    updateContent = async (req, res, next) => {
        try {
            let data = req.body;
            let type = await this.type_svc.getAllTypeById(req.type, req.params.id)
            data.type = req.type;
            if (req.file) {
                data.image = req.file.filename;
            } else {
                data.image = type.image;
            }
            if (!data.link || data.link === "null") {
                data.link = type.link
            }
            await this.type_svc.validateData(data);
            let response = await this.type_svc.updateContent(data, req.params.id);
            if (response) {
                res.json
                    (
                        {
                            result: data,
                            status: true,
                            msg: req.type + " updated"
                        }
                    )
            }
            else {
                throw "Problem while updating content"
            }
        }
        catch (exception) {
            console.log("updateContent:", exception);
            next({ status: 422, msg: exception })
        }
    }
    getById = async (req, res, next) => {
        try {
            let data = await this.type_svc.getTypeById(req.type, req.params.id)
            res.json
                (
                    {
                        result: data,
                        status: true,
                        msg: "Resource fetched"
                    }
                )
        }
        catch (except) {
            next({ status: 422, msg: except })
        }
    }
    deleteById = async (req, res, next) => {
        try {
            let response = await this.type_svc.getTypeById(req.type, req.params.id)
            res.json
                (
                    {
                        result: response,
                        status: true,
                        msg: "Content deleted successfully"
                    }
                )
        }
        catch (excepion) {
            next({ status: 422, msg: exception })
        }
    }
}
module.exports = TypeController;