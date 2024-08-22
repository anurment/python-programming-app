const doGrading = async (userUuid, code) => {
    const data = {
      user: userUuid,
      code: code,
    };
    
    const response = await fetch("/api/grade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    console.log(jsonData);
    alert(JSON.stringify(jsonData));
  };

  export { doGrading };
