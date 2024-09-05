import { sql } from "../database/database.js";

const checkGradingFeedback = (result) => {
  const resultRows = result.split("\n");
  let passed = false;
  resultRows.forEach ( (row) => {
    //console.log(`row`)
    if (row === "OK") {
      passed = true;
    }
  } )

  return passed;
};


const findAllPass = async () => {
  return await sql`SELECT * FROM programming_assignments`;
};

const findNextPas = async (userUuid) => {
  //TODO RETURNING ALL UNDONE
  /*
  const result = await sql`
    SELECT * FROM programming_assignments
    WHERE id
    NOT IN (
      SELECT programming_assignment_id
      FROM programming_assignment_submissions
      WHERE user_uuid=${userUuid} 
        AND (status='pending' OR (status='processed' AND correct=TRUE)) 
    )
    ORDER BY assignment_order ASC
    LIMIT 1`;

    return result;
  */
  const result = await sql`
    WITH user_submissions AS (
        SELECT 
            programming_assignment_id, 
            correct
        FROM 
            programming_assignment_submissions 
        WHERE 
            user_uuid = ${userUuid}
            AND status = 'processed'
      )
      SELECT 
        pa.id, 
        pa.title, 
        pa.assignment_order, 
        pa.handout, 
        pa.test_code
      FROM 
        programming_assignments pa
      LEFT JOIN 
        user_submissions us 
        ON pa.id = us.programming_assignment_id
      WHERE 
        us.programming_assignment_id IS NULL  -- User has never submitted this assignment
        OR (us.correct = FALSE)               -- User submitted but did not pass
      ORDER BY 
        pa.assignment_order ASC;`


  return result;

};

const addSubmission = async (pasId, code, uuid) => {

  const result = await sql`INSERT INTO programming_assignment_submissions
  (programming_assignment_id, code, user_uuid) VALUES (${pasId}, ${code}, ${uuid})
  RETURNING *`;
  return result[0];
};

const findSameCode = async (pasId, code, uuid) => {
  return await sql`SELECT * 
                   FROM programming_assignment_submissions
                   WHERE programming_assignment_id=${pasId} AND code=${code} AND user_uuid=${uuid}`;
};

const updateSubmission = async (id, graderFeedback) => {
  const correct = checkGradingFeedback(graderFeedback);
  return await sql`UPDATE programming_assignment_submissions
                   SET status = 'processed', grader_feedback=${graderFeedback}, correct=${correct}, last_updated=NOW()
                   WHERE id=${id}
                   RETURNING *`;
};

const findTestCode = async (id) => {
  const result = await sql`SELECT test_code FROM programming_assignments WHERE id=${id}`;
  return result[0];
}

const findAllSubmissions = async () => {
  return await sql`SELECT * FROM programming_assignment_submissions`;
};

const findSubById = async (id) => {
  const result = await sql`SELECT * FROM programming_assignment_submissions WHERE id=${id}`;
  return result[0];
}

export { findAllPass, findAllSubmissions, findNextPas, addSubmission, findSameCode, updateSubmission, findTestCode, findSubById };
