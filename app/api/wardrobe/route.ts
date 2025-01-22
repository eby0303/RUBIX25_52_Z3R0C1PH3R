import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db/connect';
import { WardrobeItem } from '@/lib/db/models/WardrobeItem';
import { Tag } from '@/lib/db/models/Tag';

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      console.error('Authentication required');
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const color = searchParams.get('color');
    const brand = searchParams.get('brand');

    await dbConnect();

    let query: any = { userId: session.user.id };
    if (category && category !== 'all') query.category = category;
    if (color && color !== 'all') query.color = color;
    if (brand && brand !== 'all') query.brand = brand;
    if (tag && tag !== 'all') {
      const tagDoc = await Tag.findOne({ name: tag, userId: session.user.id });
      if (tagDoc) {
        query.tags = tagDoc._id;
      }
    }

    const items = await WardrobeItem.find(query).populate('tags').sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error in GET /api/wardrobe:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      console.error('Authentication required');
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const data = await req.json();
    await dbConnect();

    // Validate required fields
    const requiredFields = ['name', 'category', 'brand', 'color', 'size', 'condition', 'imageUrl'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Handle tags
    const tagIds = [];
    if (data.tags && Array.isArray(data.tags)) {
      for (const tagName of data.tags) {
        const tag = await Tag.findOneAndUpdate(
          { userId: session.user.id, name: tagName },
          { userId: session.user.id, name: tagName },
          { upsert: true, new: true }
        );
        tagIds.push(tag._id);
      }
    }

    const wardrobeItem = new WardrobeItem({
      ...data,
      userId: session.user.id,
      tags: tagIds
    });

    await wardrobeItem.save();
    const populatedItem = await WardrobeItem.findById(wardrobeItem._id).populate('tags');
    return NextResponse.json(populatedItem);
  } catch (error) {
    console.error('Error in POST /api/wardrobe:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}