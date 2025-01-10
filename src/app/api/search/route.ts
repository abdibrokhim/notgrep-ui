import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Get the search query from URL params
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Forward the request to the search backend
    // const response = await fetch(`http://localhost:8080/search?q=${query}`);

    // if (!response.ok) {
    //   throw new Error('Failed to fetch search results');
    // }

    // const data = await response.json();
    const data = await import('./test_result_20250110_062909.json');
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Error in /api/search:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
