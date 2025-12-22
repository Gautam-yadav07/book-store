import { createUser } from "../../user/controllers/user-controller.js";

export const createSubAdmin = async (req, res) => {
    req.body.role = 'SubAdmin';
    return createUser(req, res);
};
