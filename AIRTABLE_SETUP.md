# Airtable Integration Setup Guide

This guide explains how to set up and use the Airtable integration for product management.

## Prerequisites

1. An Airtable account (free tier works)
2. A base created in Airtable
3. A table named "Products" (or configure `AIRTABLE_TABLE_NAME`)

## Environment Variables

Add these to your `.env.local` file:

```env
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here
AIRTABLE_TABLE_NAME=Products
```

### Getting Your Airtable Credentials

1. **API Key**: 
   - Go to https://airtable.com/api
   - Select your base
   - Copy the API key from the authentication section

2. **Base ID**:
   - Go to https://airtable.com/api
   - Select your base
   - The Base ID is in the URL: `https://api.airtable.com/v0/{BASE_ID}/...`

3. **Table Name**:
   - The name of your table in Airtable (default: "Products")

## Airtable Table Structure

Your Airtable table must have these fields:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| Name | Single line text | Yes | Product name |
| Product Code | Single line text | Yes | Unique product identifier |
| Category | Single select | Yes | Options: "Generators & Power", "Shipping Containers", "Building & Construction" |
| Short Description | Long text | Yes | Brief product description |
| Key Specs | Long text | Yes | JSON array of key specifications |
| Full Specs | Long text | No | JSON object of full specifications |
| Applications | Long text | No | JSON array of applications |
| Installation Requirements | Long text | No | Installation requirements text |
| WhatsApp Message | Long text | No | Pre-filled WhatsApp message |
| Status | Single select | Yes | Options: "Active", "Draft", "Archived" |
| Featured | Checkbox | No | Whether product is featured |
| Images | Attachment | No | Product images (upload via Airtable UI) |
| Created At | Date | Auto | Auto-generated creation date |
| Updated At | Date | Auto | Auto-generated update date |

### Field Configuration Notes

- **Key Specs, Full Specs, Applications**: These are stored as JSON strings. The migration script and API handle conversion automatically.
- **Images**: Upload images through Airtable UI. The API will read the attachment URLs.
- **Category**: Must match exactly: "Generators & Power", "Shipping Containers", or "Building & Construction"

## Migration from JSON

To migrate existing products from `data/products.json` to Airtable:

```bash
npx tsx scripts/migrate-to-airtable.ts
```

**Important Notes:**
- The script will create new records for each product
- If a product with the same code already exists, it will create a duplicate (Airtable doesn't enforce uniqueness by default)
- Rate limiting: Free tier allows 5 requests/second, so the script includes delays
- Images must be uploaded manually through Airtable UI after migration

## API Usage

The Airtable integration is transparent to the frontend. All API routes remain the same:

- `GET /api/admin/products` - Get all products
- `GET /api/admin/products?id={id}` - Get single product
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products` - Update product
- `DELETE /api/admin/products?id={id}` - Delete product (soft delete)

## Caching

The Airtable client includes a 5-minute cache to reduce API calls:

- Product lists are cached
- Individual products are cached
- Cache is cleared on create/update/delete operations

## Rate Limiting

Airtable free tier limits:
- 5 requests per second
- 1,000 requests per day

The client includes:
- Automatic retry with exponential backoff
- Request queuing (via delays in migration script)
- Caching to reduce API calls

## Error Handling

The integration handles common errors:

- **429 (Rate Limit)**: Automatic retry with backoff
- **404 (Not Found)**: Returns null/empty array
- **401 (Unauthorized)**: Check API key
- **400 (Bad Request)**: Check field names and data format

## Image Management

**Current Limitation**: Direct image uploads via API are not supported by Airtable's free tier.

**Workaround Options:**
1. Upload images through Airtable UI (recommended for now)
2. Upload to a CDN (Cloudinary, AWS S3) and add URLs to Airtable
3. Use Airtable's attachment field through their UI

## Production Deployment

For Vercel deployment:

1. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_NAME`

2. Redeploy your application

## Troubleshooting

### "Missing Airtable credentials" error
- Check `.env.local` file exists
- Verify environment variables are set correctly
- Restart your dev server after adding variables

### "Airtable API error: 401"
- API key is invalid or expired
- Regenerate API key in Airtable

### "Airtable API error: 404"
- Base ID or table name is incorrect
- Table doesn't exist in the base

### Products not showing
- Check Status field is set to "Active"
- Verify field names match exactly (case-sensitive)
- Check browser console for errors

### Migration script fails
- Check rate limiting (wait and retry)
- Verify all required fields exist in Airtable
- Check field types match expected types
- Review error messages for specific field issues

## Support

For issues or questions:
1. Check Airtable API documentation: https://airtable.com/api
2. Review error messages in console
3. Verify table structure matches requirements

