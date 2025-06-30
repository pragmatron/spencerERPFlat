<template>
  <!-- <div class="onboarding-component">
    <div class="card">
      <div class="card-header">
        <h3>Welcome to Our Application!</h3>
        <p>Complete these steps to get started</p>
      </div>
      
      <div class="progress-container">
        <div class="progress">
          <div 
            class="progress-bar bg-success" 
            role="progressbar" 
            :style="{ width: progress + '%' }" 
            :aria-valuenow="completedSteps" 
            aria-valuemin="0" 
            :aria-valuemax="totalSteps">
            {{ completedSteps }} of {{ totalSteps }}
          </div>
        </div>
      </div>

      <div class="card-body">
        <div class="onboarding-steps">
          <!-- Parts Step -->
          <div class="onboarding-step" :class="{ 'completed': visitedParts }">
            <div class="step-indicator">
              <i v-if="visitedParts" class="fas fa-check-circle text-success"></i>
              <i v-else class="far fa-circle"></i>
            </div>
            <div class="step-content">
              <h5>Visit the Parts Page</h5>
              <p>Explore our parts inventory and management system</p>
              <div class="d-flex align-items-center">
                <b-button variant="primary" @click="navigateToParts">
                  Go to Parts
                  <i class="fas fa-arrow-right ml-2"></i>
                </b-button>
                <b-button 
                  v-if="!visitedParts" 
                  variant="outline-secondary" 
                  class="ml-2" 
                  @click="markAsVisited('parts')">
                  Mark as Completed
                </b-button>
              </div>
            </div>
          </div>

          <!-- Quotes Step -->
          <div class="onboarding-step" :class="{ 'completed': visitedQuotes }">
            <div class="step-indicator">
              <i v-if="visitedQuotes" class="fas fa-check-circle text-success"></i>
              <i v-else class="far fa-circle"></i>
            </div>
            <div class="step-content">
              <h5>Create Your First Quote</h5>
              <p>Learn how to create and manage quotes for your customers</p>
              <div class="d-flex align-items-center">
                <b-button variant="primary" @click="navigateToQuotes">
                  Go to Quotes
                  <i class="fas fa-arrow-right ml-2"></i>
                </b-button>
                <b-button 
                  v-if="!visitedQuotes" 
                  variant="outline-secondary" 
                  class="ml-2" 
                  @click="markAsVisited('quotes')">
                  Mark as Completed
                </b-button>
              </div>
            </div>
          </div>

          <!-- Work Orders Step -->
          <div class="onboarding-step" :class="{ 'completed': visitedWorkOrders }">
            <div class="step-indicator">
              <i v-if="visitedWorkOrders" class="fas fa-check-circle text-success"></i>
              <i v-else class="far fa-circle"></i>
            </div>
            <div class="step-content">
              <h5>Manage Work Orders</h5>
              <p>Discover how to create and track work orders for your business</p>
              <div class="d-flex align-items-center">
                <b-button variant="primary" @click="navigateToWorkOrders">
                  Go to Work Orders
                  <i class="fas fa-arrow-right ml-2"></i>
                </b-button>
                <b-button 
                  v-if="!visitedWorkOrders" 
                  variant="outline-secondary" 
                  class="ml-2" 
                  @click="markAsVisited('workOrders')">
                  Mark as Completed
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer" v-if="allCompleted">
        <div class="text-center">
          <h5 class="text-success mb-3">
            <i class="fas fa-award mr-2"></i>
            All steps completed!
          </h5>
          <p>You're all set up and ready to use the full application.</p>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
module.exports = {
  data() {
    return {
      visitedParts: false,
      visitedQuotes: false,
      visitedWorkOrders: false
    };
  },
  computed: {
    completedSteps() {
      return [this.visitedParts, this.visitedQuotes, this.visitedWorkOrders].filter(Boolean).length;
    },
    totalSteps() {
      return 3;
    },
    progress() {
      return (this.completedSteps / this.totalSteps) * 100;
    },
    allCompleted() {
      return this.completedSteps === this.totalSteps;
    }
  },
  methods: {
    // Navigation methods
    navigateToParts() {
      this.$setCurrentSubTab('-O0PH2J2WHAomPGW20rK', '-O0P6ggwL94dkCCs88Ue');
    },
    navigateToQuotes() {
      this.$setCurrentSubTab('-O0PGZaCLfEsCnsw97Ct', '-O0P6ggwL94dkCCs88Ue');
    },
    navigateToWorkOrders() {
      this.$setCurrentSubTab('-O0PGo1HoCkJiWDYNURD', '-O0P6ggwL94dkCCs88Ue');
    },
    
    // Mark a step as visited
    markAsVisited(step) {
      this[`visited${step.charAt(0).toUpperCase() + step.slice(1)}`] = true;
      this.$setGlobalModel(`onboarding_visited_${step}`, true);
    },
    
    // Check if current page matches any of our onboarding steps
    checkCurrentPage() {
      const urlParams = new URLSearchParams(window.location.search);
      const tab = urlParams.get('tab');
      const subtab = urlParams.get('subtab');
      
      if (tab === '-O0P6ggwL94dkCCs88Ue') {
        if (subtab === '-O0PH2J2WHAomPGW20rK') {
          this.markAsVisited('parts');
        } else if (subtab === '-O0PGZaCLfEsCnsw97Ct') {
          this.markAsVisited('quotes');
        } else if (subtab === '-O0PGo1HoCkJiWDYNURD') {
          this.markAsVisited('workOrders');
        }
      }
    },
    
    // Load saved state
    loadSavedState() {
      this.visitedParts = this.$getGlobalModel('onboarding_visited_parts') || false;
      this.visitedQuotes = this.$getGlobalModel('onboarding_visited_quotes') || false;
      this.visitedWorkOrders = this.$getGlobalModel('onboarding_visited_workOrders') || false;
    }
  },
  mounted() {
    // Load the saved state when component mounts
    this.loadSavedState();
    
    // Check if current page matches any of our target pages
    this.checkCurrentPage();
    
  },
  beforeDestroy() {
    // Clean up event listener
  }
};
</script>

<style scoped>
.onboarding-component {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  background-color: #fff;
}

.card-header {
  background-color: #f8f9fa;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
}

.card-header h3 {
  margin-bottom: 10px;
  color: #495057;
}

.card-body {
  padding: 20px;
}

.progress-container {
  padding: 0 20px;
  margin-top: 20px;
}

.onboarding-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.onboarding-step {
  display: flex;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.onboarding-step:hover {
  background-color: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
}

.onboarding-step.completed {
  border-left: 4px solid #28a745;
  background-color: rgba(40, 167, 69, 0.05);
}

.step-indicator {
  margin-right: 15px;
  font-size: 24px;
  display: flex;
  align-items: center;
}

.step-content {
  flex: 1;
}

.step-content h5 {
  margin-bottom: 5px;
  color: #343a40;
}

.step-content p {
  margin-bottom: 15px;
  color: #6c757d;
}

.card-footer {
  padding: 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
}
</style>