/**
 * Seed mock data for ITSM Xianxia Dashboard
 * Generates 9 users, 200 tickets, and 40 KB articles
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

// Simple seeded random number generator
function createSeededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  let state = Math.abs(hash);
  return function() {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

const random = createSeededRandom('itsm-xianxia-2024');

// User data
const users = [
  { id: 'u1', name_vi: 'Nguyễn Văn An', name_en: 'Nguyen Van An', role: 'L2' as const },
  { id: 'u2', name_vi: 'Trần Thị Bình', name_en: 'Tran Thi Binh', role: 'L2' as const },
  { id: 'u3', name_vi: 'Lê Hoàng Cường', name_en: 'Le Hoang Cuong', role: 'L2' as const },
  { id: 'u4', name_vi: 'Phạm Minh Đức', name_en: 'Pham Minh Duc', role: 'L1' as const },
  { id: 'u5', name_vi: 'Hoàng Thu Hà', name_en: 'Hoang Thu Ha', role: 'L1' as const },
  { id: 'u6', name_vi: 'Vũ Văn Khánh', name_en: 'Vu Van Khanh', role: 'QA' as const },
  { id: 'u7', name_vi: 'Đặng Thị Linh', name_en: 'Dang Thi Linh', role: 'QA' as const },
  { id: 'u8', name_vi: 'Bùi Trung Nam', name_en: 'Bui Trung Nam', role: 'DevOps' as const },
  { id: 'u9', name_vi: 'Ngô Phương Oanh', name_en: 'Ngo Phuong Oanh', role: 'PM' as const },
];

// Generate tickets
function generateTickets() {
  const tickets = [];
  const priorities: ('P1' | 'P2' | 'P3' | 'P4')[] = ['P1', 'P2', 'P3', 'P4'];
  const priorityWeights = [0.1, 0.25, 0.45, 0.2]; // Distribution
  
  const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'] as const;
  
  for (let i = 1; i <= 200; i++) {
    // Weighted priority selection
    const rand = random();
    let priorityIndex = 0;
    let cumulative = 0;
    for (let j = 0; j < priorityWeights.length; j++) {
      cumulative += priorityWeights[j];
      if (rand < cumulative) {
        priorityIndex = j;
        break;
      }
    }
    const priority = priorities[priorityIndex];
    
    // SLA time goals in minutes
    const slaGoals: Record<string, number> = { P1: 240, P2: 480, P3: 1440, P4: 4320 };
    const slaGoal = slaGoals[priority];
    
    // Random resolution time (some breach SLA)
    const isBreached = random() > 0.8; // 20% breach rate
    const resolutionTime = isBreached 
      ? slaGoal * (1 + random() * 0.5) 
      : slaGoal * (0.3 + random() * 0.6);
    
    // Assign 1-3 assignees
    const numAssignees = Math.floor(random() * 3) + 1;
    const assignees: string[] = [];
    for (let j = 0; j < numAssignees; j++) {
      const userId = users[Math.floor(random() * users.length)].id;
      if (!assignees.includes(userId)) {
        assignees.push(userId);
      }
    }
    
    // Create worklogs
    const worklogs = assignees.map((userId) => ({
      id: `wl-${i}-${userId}`,
      userId,
      ticketId: `t${i}`,
      seconds: Math.floor(random() * 7200) + 300, // 5min to 2 hours
      createdAt: new Date(Date.now() - Math.floor(random() * 30) * 86400000).toISOString(),
      comment: `Work on ticket #${i}`,
    }));
    
    const status = random() > 0.7 ? 'Closed' : random() > 0.4 ? 'Resolved' : random() > 0.2 ? 'In Progress' : 'Open';
    const createdAt = new Date(Date.now() - Math.floor(random() * 60) * 86400000);
    const resolvedAt = status === 'Resolved' || status === 'Closed'
      ? new Date(createdAt.getTime() + resolutionTime * 60000).toISOString()
      : undefined;
    
    tickets.push({
      id: `t${i}`,
      title: `Issue #${i}: ${['System Error', 'Performance Issue', 'Bug Fix', 'Feature Request', 'Configuration'][Math.floor(random() * 5)]}`,
      description: `Description for ticket #${i}. This is a ${priority} priority issue.`,
      priority,
      status,
      assignees,
      createdAt: createdAt.toISOString(),
      resolvedAt,
      slaDeadline: new Date(createdAt.getTime() + slaGoal * 60000).toISOString(),
      worklogs,
    });
  }
  
  return tickets;
}

// Generate KB articles
function generateKB() {
  const articles = [];
  const tags = ['troubleshooting', 'guide', 'best-practices', 'faq', 'tutorial'];
  
  for (let i = 1; i <= 40; i++) {
    const authorId = users[Math.floor(random() * users.length)].id;
    const views = Math.floor(random() * 450) + 50;
    const likes = Math.floor(random() * 45) + 5;
    const comments = Math.floor(random() * 20);
    
    articles.push({
      id: `kb${i}`,
      title: `Knowledge Base Article #${i}: ${['How to', 'Guide for', 'Understanding', 'Fixing', 'Optimizing'][Math.floor(random() * 5)]} ${['System', 'Database', 'API', 'Performance', 'Security'][Math.floor(random() * 5)]}`,
      content: `Content for KB article #${i}. This article provides detailed information about the topic.`,
      authorId,
      views,
      likes,
      comments,
      createdAt: new Date(Date.now() - Math.floor(random() * 90) * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [tags[Math.floor(random() * tags.length)], tags[Math.floor(random() * tags.length)]],
    });
  }
  
  return articles;
}

// Main execution
const tickets = generateTickets();
const kb = generateKB();

const mockData = {
  users,
  tickets,
  kb,
  generatedAt: new Date().toISOString(),
};

// Write to file
const outputPath = join(process.cwd(), 'data', 'mock-data.json');
writeFileSync(outputPath, JSON.stringify(mockData, null, 2));

console.log(`✓ Mock data generated: ${users.length} users, ${tickets.length} tickets, ${kb.length} KB articles`);
console.log(`Output: ${outputPath}`);
