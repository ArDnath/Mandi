import { prisma } from './lib/prisma';

async function testPrismaProduct() {
  try {
    console.log('Testing Prisma Product model...');
    
    // Test count
    const count = await prisma.product.count();
    console.log('Product count:', count);
    
    // Test findMany
    const products = await prisma.product.findMany({ take: 5 });
    console.log('Products:', products);
    
    console.log('✅ Prisma Product model works!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrismaProduct();
