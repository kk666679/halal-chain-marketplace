import * as inventoryAgent from './inventory/inventory_agent.js';
import * as orderAgent from './order_processing/order_agent.js';
import * as supplierAgent from './supplier_analysis/supplier_agent.js';
import * as forecastingAgent from './demand_forecasting/forecasting_agent.js';
import * as recommendationAgent from './customer_interaction/recommendation_agent.js';
import * as chatbotAgent from './customer_interaction/chatbot_agent.js';
import * as stockAgent from './stock_management/stock_agent.js';
import * as dispatchAgent from './logistics/dispatch_agent.js';
import * as routingAgent from './logistics/routing_agent.js';
import * as paymentAgent from './payment/payment_agent.js';

function runAllAgents() {
  console.log('Running all agents...');

  inventoryAgent.monitorInventory('example_sku');
  orderAgent.processOrder();
  supplierAgent.analyzeSupplier();
  forecastingAgent.forecastDemand();
  recommendationAgent.recommendProducts();
  chatbotAgent.assistCustomer();
  stockAgent.updateStock();
  dispatchAgent.dispatchOrder();
  routingAgent.planRoute();
  paymentAgent.processPayment();

  console.log('All agents have run.');
}

runAllAgents();