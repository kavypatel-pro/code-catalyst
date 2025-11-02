// questionnaire.js - For the new redesigned page

document.addEventListener('DOMContentLoaded'), function() 
{
    const form = document.getElementById('questionnaireForm');
    if (!form) {
        console.error('Questionnaire form not found!');
        return;
    }

    const inputs = form.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    const totalQuestions = document.querySelectorAll('.question-section').length;

    // Mappings for the summary panel on the right
    const summaryMappings = {
        skills: document.querySelector('#summary-skills .summary-tags'),
        'work-environment': document.querySelector('#summary-environment .summary-tags'),
        experience: document.querySelector('#summary-experience .summary-tags')
    };

    // Placeholders for when no selection has been made
    const placeholders = {
        skills: 'Select your skills...',
        'work-environment': 'Choose an environment...',
        experience: 'Select your experience level...'
    };

    /**
     * Updates the summary panel and progress circle based on user selections.
     */
    const updateSummaryAndProgress = () => {
        let completedQuestions = 0;

        // Loop through each question type (skills, environment, etc.)
        for (const name in summaryMappings) {
            const container = summaryMappings[name];
            const checkedInputs = form.querySelectorAll(`input[name="${name}"]:checked`);
            
            container.innerHTML = ''; // Clear current tags

            if (checkedInputs.length > 0) {
                completedQuestions++;
                checkedInputs.forEach(input => {
                    const tag = document.createElement('span');
                    tag.className = 'summary-tag';
                    tag.textContent = input.value.charAt(0).toUpperCase() + input.value.slice(1); // Capitalize first letter
                    container.appendChild(tag);
                });
            } else {
                // If nothing is selected, show the placeholder
                const placeholder = document.createElement('span');
                placeholder.className = 'summary-tag-placeholder';
                placeholder.textContent = placeholders[name];
                container.appendChild(placeholder);
            }
        }
        
        // Update the circular progress bar
        const progressPercentage = Math.round((completedQuestions / totalQuestions) * 100);
        const progressCircle = document.querySelector('.progress-circle');
        const progressText = document.querySelector('.progress-circle-inner');
        
        if (progressCircle && progressText) {
            progressCircle.style.setProperty('--progress', `${progressPercentage * 3.6}deg`);
            progressText.textContent = `${progressPercentage}%`;
        }
    };

    /**
     * Adds visual feedback to the selected cards.
     */
    const handleVisualSelection = (input) => {
        const card = input.closest('.skill-option, .option-card, .experience-option');
        if (!card) return;

        // For radio buttons, deselect other options in the same group
        if (input.type === 'radio') {
            const groupName = input.name;
            const allOptionsInGroup = form.querySelectorAll(`input[name="${groupName}"]`);
            allOptionsInGroup.forEach(radio => {
                radio.closest('.skill-option, .option-card, .experience-option').classList.remove('selected');
            });
        }

        // Toggle the 'selected' class
        if (input.checked) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    };

    // Attach event listeners to all inputs
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            handleVisualSelection(input);
            updateSummaryAndProgress();
        });
    });

    /**
     * Handles the final form submission.
     */
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect form data into a userProfile object
        const formData = new FormData(this);
        const userProfile = {};
        for (let [key, value] of formData.entries()) {
            if (userProfile[key]) {
                if (!Array.isArray(userProfile[key])) {
                    userProfile[key] = [userProfile[key]];
                }
                userProfile[key].push(value);
            } else {
                userProfile[key] = value;
            }
        }
        
        // Save the profile to localStorage
        localStorage.setItem('userProfile', JSON.stringify(userProfile));

        // Show loading animation on the button and redirect
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.innerHTML = '<span class="loading"></span> Analyzing Your Profile...';
        submitBtn.disabled = true;

        // Simulate AI analysis time before redirecting
        setTimeout(() => {
            window.location.href = 'recommendations.html';
        }, 2500); // 2.5-second delay
    });

    // Initial call to set up the summary panel when the page loads
    updateSummaryAndProgress();
}   
// questionnaire.js - UPDATED CODE

form.addEventListener('submit', async function(e) { // Make the function async
    e.preventDefault();

    // ... (code to collect formData into userProfile remains the same) ...
    const userProfile = { /* ... collected data ... */ };
    
    // Temporarily save to localStorage so recommendations page can still access it
    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerHTML = '<span class="loading"></span> Saving Profile...';
    submitBtn.disabled = true;

    try {
        // SEND the profile to your new backend server!
        const response = await fetch('http://localhost:3000/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userProfile),
        });

        if (response.ok) {
            // If the server successfully received the profile, proceed
            setTimeout(() => {
                window.location.href = 'recommendations.html';
            }, 1000);
        } else {
            // Handle server errors
            alert('Could not save your profile. Please try again.');
            submitBtn.innerHTML = 'Get My Recommendations';
            submitBtn.disabled = false;
        }

    } catch (error) {
        console.error('Error submitting profile:', error);
        alert('A network error occurred. Please try again.');
        submitBtn.innerHTML = 'Get My Recommendations';
        submitBtn.disabled = false;
    }
});