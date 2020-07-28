import Joi from "@hapi/joi";

// validating all the fields at once while submitting the form
let validate = (obj, schemaBlueprint) => {
	//assigning "schemaBlueprint"'s  properties in Joi.object
	const userSchema = Joi.object(schemaBlueprint);
	const result = userSchema.validate(obj, { abortEarly: false });
	return result;
};

//validating each field while inputting the value
let validateProperty = (e, schemaBlueprint) => {
	// avoiding "confirmPassword" field to be validated while inputting
	// because it needs "password" field as a reference
	//////////// HAVE TO WORK ON IT LATER ///////////////

	if (e.target.name === "confirmPassword") {
		const result = { value: "", error: undefined };
		return result;
	}

	// making an object of the individual input field(property)
	const propertyToCheck = {};
	propertyToCheck[e.target.name] = e.target.value;

	// making an schema which has only one property
	// taken from "schemaBlueprint"
	const property = {};
	property[e.target.name] = schemaBlueprint[e.target.name];
	let propertySchema = Joi.object(property);

	//validating that property by newly created schema
	const result = propertySchema.validate(propertyToCheck);
	return result;
};

// merging input field state with component state
// meanwhile validating each input by calling "validateProperty"
// the function is called whenever any change is observed in the input field
export let changeHandler = (e, schemaBlueprint, data) => {
	// copying the state in new variable
	// one shouldn't manipulate the state directly
	let newData = { ...data };
	//console.log(newData);

	// calling "validateProperty" function to
	// validate that specific input field(property)
	const result = validateProperty(e, schemaBlueprint);

	//if the input is valid...
	if (result.error === undefined) {
		//saving the input data in a temporary object
		newData.user[e.target.name] = e.target.value;
		newData.error[e.target.name] = "";
	}
	// if the input is not valid...
	else {
		newData.error[e.target.name] = result.error.details[0].message;
	}
	//saving the data in the state
	return newData;
};

// submitting the form (saving into database)
// after validating all the input at once by calling "validate"
// the function is called when "submit" button is pressed
export let submitHandler = (e, schemaBlueprint, data) => {
	//preventing the database call
	e.preventDefault();
	//console.log(data);

	// validating all the data in the state at once
	const result = validate(data.user, schemaBlueprint);
	console.log(result.error);
	return result;
};
