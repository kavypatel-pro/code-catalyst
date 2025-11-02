// Recommendations page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user profile exists
    const userProfile = localStorage.getItem('userProfile');
    if (!userProfile) {
        // Redirect to questionnaire if no profile
        window.location.href = 'questionnaire.html';
        return;
    }
    
    // Load user profile and generate recommendations
    const profile = JSON.parse(userProfile);
    generateRecommendations(profile);
    displayProfileSummary(profile);
    animateStats();
});

// Generate personalized recommendations based on user profile
function generateRecommendations(profile) {
    const recommendations = getMatchingInternships(profile);
    displayRecommendations(recommendations);
}

// Get matching internships based on user profile
function getMatchingInternships(profile) {
    // Sample internship database with detailed information
    const internships = [
        {
            id: 1,
            title: "Software Development Intern",
            company: "TechCorp Solutions",
            location: "Bangalore, Karnataka",
            type: "Full-time",
            duration: "3-6 months",
            stipend: "₹15,000/month",
            description: "Work on cutting-edge web applications using React, Node.js, and cloud technologies. Perfect for computer science students.",
            skills: ["JavaScript", "React", "Node.js", "MongoDB"],
            sector: "technology",
            workEnvironment: "hybrid",
            experienceLevel: "intermediate",
            learningStyle: "hands-on",
            availability: "full-time",
            matchScore: 95,
            reviews: [
                {
                    rating: 5,
                    comment: "Amazing learning experience! Great mentors and real-world projects.",
                    author: "Priya S.",
                    date: "2024-01-15"
                },
                {
                    rating: 4,
                    comment: "Good exposure to modern technologies. Work-life balance could be better.",
                    author: "Rahul K.",
                    date: "2024-01-10"
                }
            ],
            companyLogo: "fas fa-laptop-code"
        },
        {
            id: 2,
            title: "Data Analytics Intern",
            company: "FinanceFirst Ltd",
            location: "Mumbai, Maharashtra",
            type: "Part-time",
            duration: "1-3 months",
            stipend: "₹12,000/month",
            description: "Analyze business data and create reports for strategic decision making. Great for business and economics students.",
            skills: ["Excel", "SQL", "Power BI", "Python"],
            sector: "business",
            workEnvironment: "office",
            experienceLevel: "beginner",
            learningStyle: "mentored",
            availability: "part-time",
            matchScore: 88,
            reviews: [
                {
                    rating: 5,
                    comment: "Excellent mentorship program. Learned a lot about data analysis.",
                    author: "Anita M.",
                    date: "2024-01-20"
                },
                {
                    rating: 4,
                    comment: "Good company culture and learning opportunities.",
                    author: "Vikram R.",
                    date: "2024-01-12"
                }
            ],
            companyLogo: "fas fa-chart-line"
        },
        {
            id: 3,
            title: "Healthcare Research Intern",
            company: "MedTech Innovations",
            location: "Delhi, NCR",
            type: "Full-time",
            duration: "3-6 months",
            stipend: "₹10,000/month",
            description: "Research healthcare trends and assist in developing medical technology solutions. Ideal for medical and biotechnology students.",
            skills: ["Research", "Data Analysis", "Medical Knowledge", "Statistics"],
            sector: "healthcare",
            workEnvironment: "hybrid",
            experienceLevel: "intermediate",
            learningStyle: "independent",
            availability: "full-time",
            matchScore: 92,
            reviews: [
                {
                    rating: 5,
                    comment: "Meaningful work in healthcare technology. Great research experience.",
                    author: "Dr. Meera P.",
                    date: "2024-01-18"
                },
                {
                    rating: 4,
                    comment: "Interesting projects and good learning curve.",
                    author: "Arjun S.",
                    date: "2024-01-14"
                }
            ],
            companyLogo: "fas fa-heartbeat"
        },
        {
            id: 4,
            title: "Mobile App Development Intern",
            company: "AppCraft Studios",
            location: "Remote",
            type: "Full-time",
            duration: "3-6 months",
            stipend: "₹18,000/month",
            description: "Develop mobile applications for iOS and Android platforms. Work with Flutter and React Native technologies.",
            skills: ["Flutter", "React Native", "Dart", "Firebase"],
            sector: "technology",
            workEnvironment: "remote",
            experienceLevel: "advanced",
            learningStyle: "hands-on",
            availability: "flexible",
            matchScore: 90,
            reviews: [
                {
                    rating: 5,
                    comment: "Best remote internship experience! Flexible hours and great team.",
                    author: "Sneha L.",
                    date: "2024-01-22"
                },
                {
                    rating: 4,
                    comment: "Good learning opportunities in mobile development.",
                    author: "Karan T.",
                    date: "2024-01-16"
                }
            ],
            companyLogo: "fas fa-mobile-alt"
        },
        {
            id: 5,
            title: "Digital Marketing Intern",
            company: "BrandBoost Agency",
            location: "Chennai, Tamil Nadu",
            type: "Part-time",
            duration: "1-3 months",
            stipend: "₹8,000/month",
            description: "Create and manage digital marketing campaigns across social media platforms. Learn SEO, content marketing, and analytics.",
            skills: ["Social Media", "SEO", "Content Creation", "Analytics"],
            sector: "marketing",
            workEnvironment: "office",
            experienceLevel: "beginner",
            learningStyle: "mentored",
            availability: "part-time",
            matchScore: 85,
            reviews: [
                {
                    rating: 4,
                    comment: "Great introduction to digital marketing. Creative work environment.",
                    author: "Divya R.",
                    date: "2024-01-19"
                },
                {
                    rating: 5,
                    comment: "Amazing team and lots of hands-on experience with real clients.",
                    author: "Rohit G.",
                    date: "2024-01-13"
                }
            ],
            companyLogo: "fas fa-bullhorn"
        }
    ];
    
    // Filter and score internships based on user profile
    const scoredInternships = internships.map(internship => {
        let score = 0;
        let reasons = [];
        
        // Score based on skills match
        if (profile.skills) {
            const userSkills = Array.isArray(profile.skills) ? profile.skills : [profile.skills];
            const skillMatches = userSkills.filter(skill => 
                internship.skills.some(internshipSkill => 
                    internshipSkill.toLowerCase().includes(skill.toLowerCase()) ||
                    skill.toLowerCase().includes(internshipSkill.toLowerCase())
                )
            ).length;
            score += (skillMatches / userSkills.length) * 30;
            if (skillMatches > 0) {
                reasons.push(`Matches ${skillMatches} of your skills`);
            }
        }
        
        // Score based on work environment preference
        if (profile['work-environment'] === internship.workEnvironment) {
            score += 20;
            reasons.push('Matches your work environment preference');
        }
        
        // Score based on experience level
        if (profile.experience === internship.experienceLevel) {
            score += 15;
            reasons.push('Matches your experience level');
        }
        
        // Score based on learning style
        if (profile['learning-style'] === internship.learningStyle) {
            score += 15;
            reasons.push('Matches your learning style');
        }
        
        // Score based on availability
        if (profile.availability === internship.availability) {
            score += 10;
            reasons.push('Matches your availability');
        }
        
        // Score based on career goals
        if (profile['career-goals']) {
            const userGoals = Array.isArray(profile['career-goals']) ? profile['career-goals'] : [profile['career-goals']];
            if (userGoals.includes('startup') && internship.company.includes('Studios')) {
                score += 10;
                reasons.push('Aligns with your startup career goal');
            }
            if (userGoals.includes('corporate') && internship.company.includes('Ltd')) {
                score += 10;
                reasons.push('Aligns with your corporate career goal');
            }
        }
        
        return {
            ...internship,
            matchScore: Math.round(score),
            matchReasons: reasons
        };
    });
    
    // Sort by match score and return top 5
    return scoredInternships
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 5);
}

// Display recommendations
function displayRecommendations(recommendations) {
    const grid = document.getElementById('recommendationsGrid');
    grid.innerHTML = '';
    
    recommendations.forEach((internship, index) => {
        const card = createRecommendationCard(internship, index + 1);
        grid.appendChild(card);
    });
}

// Create recommendation card
function createRecommendationCard(internship, rank) {
    const card = document.createElement('div');
    card.className = 'recommendation-card';
    card.innerHTML = `
        <div class="recommendation-header">
            <div class="rank-badge">
                <span class="rank-number">#${rank}</span>
                <span class="match-score">${internship.matchScore}% Match</span>
            </div>
            <div class="company-logo">
                <i class="${internship.companyLogo}"></i>
            </div>
        </div>
        
        <div class="recommendation-content">
            <h3>${internship.title}</h3>
            <p class="company-name">${internship.company}</p>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${internship.location}</p>
            
            <p class="description">${internship.description}</p>
            
            <div class="internship-meta">
                <span class="duration"><i class="fas fa-clock"></i> ${internship.duration}</span>
                <span class="stipend"><i class="fas fa-rupee-sign"></i> ${internship.stipend}</span>
                <span class="type"><i class="fas fa-briefcase"></i> ${internship.type}</span>
            </div>
            
            <div class="skills">
                ${internship.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            
            <div class="match-reasons">
                <h4>Why this matches you:</h4>
                <ul>
                    ${internship.matchReasons.map(reason => `<li>${reason}</li>`).join('')}
                </ul>
            </div>
            
            <div class="reviews-section">
                <h4>Student Reviews</h4>
                <div class="reviews">
                    ${internship.reviews.map(review => `
                        <div class="review">
                            <div class="review-header">
                                <div class="review-rating">
                                    ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}
                                </div>
                                <div class="review-author">${review.author}</div>
                            </div>
                            <p class="review-comment">"${review.comment}"</p>
                            <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="recommendation-actions">
            <button class="btn-apply" onclick="applyInternship('${internship.title}')">
                <i class="fas fa-paper-plane"></i>
                Apply Now
            </button>
            <button class="btn-save" onclick="saveInternship(${internship.id})">
                <i class="fas fa-bookmark"></i>
                Save
            </button>
        </div>
    `;
    
    return card;
}

// Display profile summary
function displayProfileSummary(profile) {
    // Skills tags
    if (profile.skills) {
        const skills = Array.isArray(profile.skills) ? profile.skills : [profile.skills];
        document.getElementById('skillsTags').innerHTML = skills.map(skill => 
            `<span class="profile-tag">${skill}</span>`
        ).join('');
    }
    
    // Preferences tags
    const preferences = [];
    if (profile['work-environment']) preferences.push(profile['work-environment']);
    if (profile['learning-style']) preferences.push(profile['learning-style']);
    if (profile.availability) preferences.push(profile.availability);
    document.getElementById('preferencesTags').innerHTML = preferences.map(pref => 
        `<span class="profile-tag">${pref}</span>`
    ).join('');
    
    // Goals tags
    if (profile['career-goals']) {
        const goals = Array.isArray(profile['career-goals']) ? profile['career-goals'] : [profile['career-goals']];
        document.getElementById('goalsTags').innerHTML = goals.map(goal => 
            `<span class="profile-tag">${goal}</span>`
        ).join('');
    }
}

// Animate statistics
function animateStats() {
    const stats = [
        { element: document.getElementById('matchScore'), target: 95 },
        { element: document.getElementById('opportunitiesAnalyzed'), target: 500 },
        { element: document.getElementById('recommendationsCount'), target: 5 }
    ];
    
    stats.forEach(stat => {
        animateNumber(stat.element, stat.target);
    });
}

// Animate number counting
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50; // Controls the speed of the animation
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Use the element's ID to determine the correct formatting
        const value = Math.floor(current);
        if (element.id === 'matchScore') {
            element.textContent = value + '%';
        } else if (element.id === 'opportunitiesAnalyzed') {
            element.textContent = value + '+';
        } else {
            element.textContent = value;
        }
    }, 30);
}

// Action functions
function retakeQuestionnaire() {
    if (confirm('Are you sure you want to retake the questionnaire? This will update your recommendations.')) {
        localStorage.removeItem('userProfile');
        window.location.href = 'questionnaire.html';
    }
}

function viewAllInternships() {
    window.location.href = 'index.html';
}

function applyInternship(title) {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        alert('Please login to apply for internships');
        window.location.href = 'index.html';
        return;
    }
    
    // Show loading state
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="loading"></span> Applying...';
    button.disabled = true;
    
    // Simulate application
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Applied!';
        button.style.background = '#22c55e';
        
        // Show success notification
        showNotification(`Successfully applied for ${title}!`, 'success');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '#4F46E5';
            button.disabled = false;
        }, 3000);
    }, 2000);
}

function saveInternship(id) {
    // Get saved internships
    let saved = JSON.parse(localStorage.getItem('savedInternships') || '[]');
    
    if (!saved.includes(id)) {
        saved.push(id);
        localStorage.setItem('savedInternships', JSON.stringify(saved));
        
        const button = event.target;
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Saved!';
        button.style.background = '#22c55e';
        
        showNotification('Internship saved to your favorites!', 'success');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '#6b7280';
        }, 2000);
    } else {
        showNotification('This internship is already saved!', 'error');
    }
}

// Notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
// recommendations.js - UPDATED CODE

document.addEventListener('DOMContentLoaded', async function() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (!userProfile) {
        window.location.href = 'questionnaire.html';
        return;
    }

    try {
        // FETCH from your new backend server API!
        const response = await fetch('http://localhost:3000/api/internships');
        const allInternships = await response.json();
        
        generateRecommendations(userProfile, allInternships);
        displayProfileSummary(userProfile);

    } catch (error) {
        console.error('Failed to load internships from server:', error);
        // Display an error message to the user on the page
    }
});

// ... The rest of the file (getMatchingInternships, displayRecommendations, etc.) remains the same.


