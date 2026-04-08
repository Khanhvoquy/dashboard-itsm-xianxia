/**
 * Sync data script - processes mock data and calculates gamification stats
 * Output: data/snapshot.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import {
  calculateSLABonus,
  calculateMultiAssigneePoints,
  calculateKBPoints,
  getLevelFromXP,
  getRealmFromLevel,
  getTamMaStatus,
  getSLATimeGoal,
} from '../src/lib/gamification/calculator';
import type { User, Ticket, KB_Article, Worklog } from '../src/types';

// Load mock data
const mockDataPath = join(process.cwd(), 'data', 'mock-data.json');
const mockData = JSON.parse(readFileSync(mockDataPath, 'utf-8'));

const users: User[] = mockData.users;
const tickets: Ticket[] = mockData.tickets;
const kbArticles: KB_Article[] = mockData.kb;

// Calculate stats for each user
const userStats = users.map((user) => {
  let totalXP = 0;
  let resolvedTickets = 0;
  let metSLA = 0;
  
  // Process tickets assigned to this user
  const userTickets = tickets.filter(t => t.assignees.includes(user.id));
  
  userTickets.forEach(ticket => {
    if (ticket.status === 'Resolved' || ticket.status === 'Closed') {
      resolvedTickets++;
      
      // Calculate SLA result
      const createdAt = new Date(ticket.createdAt).getTime();
      const resolvedAt = ticket.resolvedAt ? new Date(ticket.resolvedAt).getTime() : Date.now();
      const slaDeadline = new Date(ticket.slaDeadline).getTime();
      
      const timeRemaining = (slaDeadline - resolvedAt) / 60000; // minutes
      const timeGoal = getSLATimeGoal(ticket.priority);
      
      const points = calculateSLABonus(timeRemaining, timeGoal);
      const isBreached = timeRemaining < 0;
      
      if (!isBreached) {
        metSLA++;
      }
      
      // Calculate points from this ticket
      const ticketPoints = calculateMultiAssigneePoints(
        ticket.worklogs,
        user.id,
        user.role,
        { isBreached, points }
      );
      
      totalXP += Math.round(ticketPoints);
    }
  });
  
  // Calculate KB score
  const userKBArticles = kbArticles.filter(kb => kb.authorId === user.id);
  let kbScore = 0;
  userKBArticles.forEach(article => {
    kbScore += calculateKBPoints(article.views, article.likes, article.comments);
  });
  
  // Add KB points to XP (10% of KB score)
  totalXP += Math.round(kbScore * 0.1);
  
  // Calculate level and progress
  const { level, levelProgress, nextLevelXp } = getLevelFromXP(totalXP);
  const realm = getRealmFromLevel(level);
  
  // Calculate SLA compliance
  const slaCompliance = resolvedTickets > 0 
    ? Math.round((metSLA / resolvedTickets) * 100) 
    : 100;
  
  // Get Tâm Ma status
  const tamMaStatus = getTamMaStatus(slaCompliance);
  
  return {
    ...user,
    totalXP,
    currentLevel: level,
    levelProgress,
    nextLevelXp,
    realm,
    slaCompliance,
    kbContributions: userKBArticles.length,
    kbScore: Math.round(kbScore),
    tamMaStatus,
    resolvedTickets,
  };
});

// Calculate global stats
const totalTickets = tickets.length;
const resolvedTicketsCount = tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length;
const avgSLA = Math.round(
  userStats.reduce((sum, u) => sum + u.slaCompliance, 0) / userStats.length
);
const topPerformer = userStats.sort((a, b) => b.totalXP - a.totalXP)[0]?.name_en || 'N/A';
const teamLevel = Math.round(userStats.reduce((sum, u) => sum + u.currentLevel, 0) / userStats.length);
const totalKB = kbArticles.length;

const snapshot = {
  users: userStats,
  tickets,
  kb: kbArticles,
  globalStats: {
    totalTickets,
    resolvedTickets: resolvedTicketsCount,
    avgSLA,
    topPerformer,
    teamLevel,
    totalKB,
  },
  generatedAt: new Date().toISOString(),
};

// Write snapshot
const outputPath = join(process.cwd(), 'data', 'snapshot.json');
writeFileSync(outputPath, JSON.stringify(snapshot, null, 2));

console.log('✓ Data sync completed!');
console.log(`  Users: ${userStats.length}`);
console.log(`  Tickets: ${tickets.length}`);
console.log(`  KB Articles: ${kbArticles.length}`);
console.log(`  Top Performer: ${topPerformer}`);
console.log(`  Team Average Level: ${teamLevel}`);
console.log(`  Average SLA Compliance: ${avgSLA}%`);
console.log(`Output: ${outputPath}`);
