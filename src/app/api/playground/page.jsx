'use client';

import { useState, useEffect } from 'react';
import { FaPlay, FaCode, FaDownload, FaSave, FaTrash, FaCloudUploadAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function ApiPlayground() {
  const [code, setCode] = useState(`// Welcome to the HalalChain API Playground
// Try out our APIs with this interactive console

// Initialize the client
const client = new HalalChainClient({
  apiKey: "YOUR_API_KEY", // Use your API key or the sandbox key
  environment: "sandbox"
});

// Example: Verify a certification
async function verifyCertification() {
  const certId = "cert_example123";
  
  try {
    const result = await client.certifications.verify(certId);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Run this function to see the results
return verifyCertification();`);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedSnippets, setSavedSnippets] = useState([]);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    // Load saved snippets from localStorage
    const saved = localStorage.getItem('apiPlaygroundSnippets');
    if (saved) {
      setSavedSnippets(JSON.parse(saved));
    }
  }, []);

  const runCode = async () => {
    setLoading(true);
    setResult(null);
    
    // Simulate API execution with a delay
    setTimeout(() => {
      try {
        // This is a mock result - in a real implementation, you would
        // use a sandboxed environment to actually execute the code
        const mockResult = {
          isValid: true,
          issuer: "Global Halal Authority",
          issuedAt: "2025-03-15T10:30:45Z",
          expiresAt: "2026-03-15T10:30:45Z",
          product: {
            id: "prod_example456",
            name: "Organic Halal Chicken",
            category: "Meat & Poultry",
            manufacturer: "EcoFarm Industries"
          },
          verificationMethod: "blockchain",
          blockchainVerification: {
            verified: true,
            network: "Ethereum",
            txHash: "0x1a2b3c4d5e6f...",
            blockNumber: 15243687
          }
        };
        
        setResult({
          success: true,
          data: mockResult
        });
        
        toast({
          title: "Code executed successfully",
          variant: "success"
        });
      } catch (error) {
        setResult({
          success: false,
          error: error.message || "An unknown error occurred"
        });
        
        toast({
          title: "Execution failed",
          description: error.message || "An unknown error occurred",
          variant: "error"
        });
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const saveSnippet = () => {
    const snippetName = prompt("Enter a name for this snippet:");
    if (!snippetName) return;
    
    const newSnippet = {
      id: Date.now().toString(),
      name: snippetName,
      code
    };
    
    const updatedSnippets = [...savedSnippets, newSnippet];
    setSavedSnippets(updatedSnippets);
    localStorage.setItem('apiPlaygroundSnippets', JSON.stringify(updatedSnippets));
    
    toast({
      title: "Snippet saved",
      description: `"${snippetName}" has been saved to your collection.`,
      variant: "success"
    });
  };

  const loadSnippet = (snippet) => {
    setCode(snippet.code);
    
    toast({
      title: "Snippet loaded",
      description: `"${snippet.name}" has been loaded into the editor.`,
      variant: "default"
    });
  };

  const deleteSnippet = (id) => {
    const updatedSnippets = savedSnippets.filter(snippet => snippet.id !== id);
    setSavedSnippets(updatedSnippets);
    localStorage.setItem('apiPlaygroundSnippets', JSON.stringify(updatedSnippets));
    
    toast({
      title: "Snippet deleted",
      variant: "default"
    });
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'halalchain-api-snippet.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Code downloaded",
      variant: "success"
    });
  };

  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API Playground</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Test and experiment with the HalalChain API in a sandbox environment
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button
              onClick={downloadCode}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FaDownload className="mr-2 h-4 w-4" />
              Download
            </button>
            <button
              onClick={saveSnippet}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
            >
              <FaSave className="mr-2 h-4 w-4" />
              Save
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Saved Snippets Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Saved Snippets</h2>
              
              {savedSnippets.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No saved snippets yet. Save your code to access it later.
                </p>
              ) : (
                <ul className="space-y-2">
                  {savedSnippets.map((snippet) => (
                    <li key={snippet.id} className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => loadSnippet(snippet)}
                          className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 truncate max-w-[150px]"
                        >
                          {snippet.name}
                        </button>
                        <button
                          onClick={() => deleteSnippet(snippet.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <FaTrash className="h-3 w-3" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Example Templates</h3>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => loadSnippet({
                        name: "Certification Verification",
                        code: `// Verify a halal certification
const client = new HalalChainClient({
  apiKey: "YOUR_API_KEY",
  environment: "sandbox"
});

async function verifyCertification() {
  const certId = "cert_example123";
  
  try {
    const result = await client.certifications.verify(certId);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

return verifyCertification();`
                      })}
                      className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Certification Verification
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => loadSnippet({
                        name: "Supply Chain Tracking",
                        code: `// Track a product through the supply chain
const client = new HalalChainClient({
  apiKey: "YOUR_API_KEY",
  environment: "sandbox"
});

async function trackProduct() {
  const productId = "prod_example456";
  
  try {
    const result = await client.supplyChain.getProductJourney(productId);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

return trackProduct();`
                      })}
                      className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Supply Chain Tracking
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => loadSnippet({
                        name: "Quantum Verification",
                        code: `// Perform quantum verification
const client = new HalalChainClient({
  apiKey: "YOUR_API_KEY",
  environment: "sandbox"
});

async function quantumVerify() {
  const productId = "prod_example456";
  const sampleId = "sample_abc123";
  
  try {
    const session = await client.quantum.initVerificationSession({
      productId,
      sampleId,
      verificationLevel: "molecular"
    });
    
    const result = await client.quantum.verifyMolecularComposition({
      sessionId: session.id,
      referenceData: {
        molecularSignature: "SAMPLE_MOLECULAR_SIGNATURE",
        confidenceThreshold: 0.95
      }
    });
    
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

return quantumVerify();`
                      })}
                      className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Quantum Verification
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Code Editor and Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Code Editor */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Code Editor</h2>
                <button
                  onClick={runCode}
                  disabled={loading}
                  className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Running...
                    </>
                  ) : (
                    <>
                      <FaPlay className="mr-2 h-4 w-4" />
                      Run Code
                    </>
                  )}
                </button>
              </div>
              
              <div className="p-4">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 font-mono text-sm p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  spellCheck="false"
                />
              </div>
            </div>
            
            {/* Results */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Results</h2>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    result.success
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {result.success ? 'Success' : 'Error'}
                  </span>
                </div>
                
                <div className="p-4">
                  <SyntaxHighlighter
                    language="json"
                    style={atomDark}
                    customStyle={{
                      borderRadius: '0.375rem',
                      padding: '1rem',
                      backgroundColor: '#1a1a1a'
                    }}
                  >
                    {JSON.stringify(result.success ? result.data : { error: result.error }, null, 2)}
                  </SyntaxHighlighter>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="mt-12 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaCloudUploadAlt className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                Need a production API key?
              </h3>
              <div className="mt-2 text-sm text-emerald-700 dark:text-emerald-200">
                <p>
                  This playground uses a sandbox environment. For production access, please visit our{' '}
                  <a href="/dashboard/developer" className="font-medium underline hover:text-emerald-900 dark:hover:text-emerald-100">
                    Developer Dashboard
                  </a>{' '}
                  to generate API keys.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}