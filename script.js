const questions = [
  {
    "_id": 5,
    "question": "Contoso plans to migrate their existing on-premises SQL VMs to Azure. Which expenditure model does this implement?",
    "answers": [
      "Capital (CAPEX)",
      "@Operational (OPEX)",
      "Subscription",
      "Elastic"
    ]
  },
  {
    "_id": 6,
    "question": "A financial analysis of migration of on-premises files to Azure Storage at Contoso showed that storing 2TB of archived data in Azure would be less expensive than hosting this data on-premises. The report also showed unit cost in Azure would decrease even further as the data archive grows. This is an example of cloud",
    "answers": [
      "Elasticity",
      "@Economies of scale",
      "Scalability",
      "High Availability"
    ]
  },
  {
    "_id": 12,
    "question": "You are deploying multiple instances of a custom Contoso web application. The application instances share a common management lifecycle, but will be located in different Azure regions. Can you deploy resources across multiple Azure regions in a single resource group?",
    "answers": [
      "@Yes",
      "No"
    ]
  },
  {
    "_id": 7,
    "question": "The Contoso Corp Financial Services team needs to automate several business processes. They need to create workflows in a low-code environment with a visual interface. The service must have built-in connectivity to their existing platforms, like SalesForce and SAP. They also require the flexibility to run develop and run small snippets of code if necessary. Which Microsoft service will best fit their use case?",
    "answers": [
      "Power Automate",
      "@Logic Apps",
      "Azure Automation",
      "Azure Functions"
    ]
  },
  {
    "_id": 10,
    "question": "Contoso IT needs to ensure deployments of like Azure resources are the same for every deployment. Which of the following could be used to automate resource deployment?",
    "answers": [
      "Azure API Management",
      "Management Groups",
      "@Azure Resource Manager (ARM) templates",
      "Azure Synapse"
    ]
  },
  {
    "_id": 19,
    "question": "To retire some aging on-premises servers, Contoso is planning to move several SQL databases to Azure SQL Database. The CIO has asked for a tool to estimate the cost of hosting these resources in Azure. Sally suggests using the Azure Pricing Calculator to estimate costs prior to migration. Does Sally's solution meet the solution criteria?",
    "answers": [
      "@Yes",
      "No"
    ]
  },
  {
    "_id": 17,
    "question": "You can monitor health and availability of your Azure Kubernetes Service (AKS) cluster with:",
    "answers": [
      "@Azure Monitor",
      "Azure App Insights",
      "Microsoft Sentinel",
      "Microsoft Defender for Cloud"
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
  const questionContainer = document.getElementById('question-container');
  const answerContainer = document.getElementById('answer-container');
  const nextButton = document.getElementById('next-button');
  const resultContainer = document.getElementById('result-container');
  const scoreElement = document.getElementById('score');
  const retryButton = document.getElementById('retry-button');

  function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
      questionContainer.classList.add('hidden');
      answerContainer.classList.add('hidden');
      nextButton.classList.add('hidden');
      resultContainer.classList.remove('hidden');
      scoreElement.textContent = `Acertaste ${score} de ${questions.length} preguntas.`;
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const answers = currentQuestion.answers.map((answer, index) => {
      const isCorrect = answer.startsWith('@');
      const cleanAnswer = answer.replace('@', '');
      return { answer: cleanAnswer, isCorrect, index };
    });

    questionContainer.textContent = currentQuestion.question;
    answerContainer.innerHTML = '';
    answers.forEach(({ answer, isCorrect, index }) => {
      const div = document.createElement('div');
      div.className = 'form-check';
      const input = document.createElement('input');
      input.className = 'form-check-input';
      input.type = 'radio';
      input.name = 'answer';
      input.id = `answer${index}`;
      input.value = isCorrect;

      const label = document.createElement('label');
      label.className = 'form-check-label';
      label.htmlFor = `answer${index}`;
      label.textContent = answer;

      div.appendChild(input);
      div.appendChild(label);
      answerContainer.appendChild(div);
    });
  }

  nextButton.addEventListener('click', () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
      if (selectedAnswer.value === 'true') {
        score++;
      }
      currentQuestionIndex++;
      loadQuestion();
    } else {
      alert('Por favor selecciona una respuesta');
    }
  });

  retryButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.classList.remove('hidden');
    answerContainer.classList.remove('hidden');
    nextButton.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    loadQuestion();
  });

  loadQuestion();
});
