import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const { handleSubmit, register } = useForm();
  const getScore = (form) => {
    let sum = 0;
    const selections = [
      form.previousContact,
      form.catAltercations,
      form.ownerAltercations,
      form.playsWellWithDogs,
      form.hissesAtStrangers,
    ];
    selections.forEach((i) => {
      const currentNum = Number(i);
      sum += currentNum;
    });
    return sum;
  };
  const getRiskLevel = (form) => {
    let riskLevel = `low`;
    if (form.score >= 2) {
      riskLevel = `medium`;
    }
    else if (form.score >= 4) {
      riskLevel = `high`;
    }
    return riskLevel;
  };
  const onSubmit = async (data) => {
    data.instrumentType = 1;
    // eslint-disable-next-line max-len
    // data.score = Number(data.previousContact) + Number(data.catAltercations) + Number(data.ownerAltercations) + Number(data.playsWellWithDogs) + Number(data.hissesAtStrangers);
    data.score = getScore(data);
    data.riskLevel = getRiskLevel(data);
    try {
      await AssessmentService.submit(data);
      alert(`Submitted assessment`);
    }
    catch (err) {
      alert(`Something went wrong submitting the assessment: ${err}`);
    }
  };

  return <Form onSubmit={handleSubmit(onSubmit)}>
    <Form.Text>Cat Behavioral Instrument</Form.Text>
    <Form.Group className="mb-3" controlId="Assessment.catName">
      <Form.Label>Cat Name</Form.Label>
      <Form.Control type="text" {...register(`catName`)} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="Assessment.catDOB">
      <Form.Label>Cat DOB</Form.Label>
      <Form.Control type="date" {...register(`catDateOfBirth`)} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="Assessment.previousContact">
      <Form.Label>Previous contact with Cat Judicial System</Form.Label>
      <Form.Select {...register(`previousContact`)}>
        <option>Select...</option>
        <option value="0">No</option>
        <option value="1">Yes</option>
      </Form.Select>
    </Form.Group>
    <Form.Group className="mb-3" controlId="Assessment.catAltercations">
      <Form.Label>Physical altercations with other cats</Form.Label>
      <Form.Select {...register(`catAltercations`)}>
        <option>Select...</option>
        <option value="0">0-2</option>
        <option value="1">3+</option>
      </Form.Select>
    </Form.Group>
    <Form.Group className="mb-3" controlId="Assessment.ownerAltercations">
      <Form.Label>Physical altercations with owner</Form.Label>
      <Form.Select {...register(`ownerAltercations`)}>
        <option>Select...</option>
        <option value="0">0-9</option>
        <option value="1">10+</option>
      </Form.Select>
    </Form.Group>
    <Form.Group className="mb-3" controlId="Assessment.playsWellWithDogs">
      <Form.Label>Plays well with dogs?</Form.Label>
      <Form.Select {...register(`playsWellWithDogs`)}>
        <option>Select...</option>
        <option value="1">No</option>
        <option value="0">Yes</option>
      </Form.Select>
    </Form.Group>
    <Form.Group className="mb-3" controlId="Assessment.hissesAtStrangers">
      <Form.Label>Hisses at strangers?</Form.Label>
      <Form.Select {...register(`hissesAtStrangers`)}>
        <option>Select...</option>
        <option value="0">No</option>
        <option value="1">Yes</option>
      </Form.Select>
    </Form.Group>
    <Button variant="primary" type="submit">Submit</Button>
  </Form>;
};
